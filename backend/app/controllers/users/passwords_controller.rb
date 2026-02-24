# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  respond_to :json

  # POST /password — request reset (send email)
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    if successfully_sent?(resource)
      render json: {
        message: "If an account exists with that email, you will receive password reset instructions."
      }, status: :ok
    else
      # Devise sends same message for security (don't reveal if email exists)
      render json: {
        message: "If an account exists with that email, you will receive password reset instructions."
      }, status: :ok
    end
  end

  # PUT /password — reset with token
  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    if resource.errors.empty?
      resource.unlock_access! if resource.respond_to?(:unlock_access!)
      # Optionally sign in and return JWT so user is logged in after reset
      if resource.persisted? && resource.active_for_authentication?
        sign_in(resource)
        current_token = request.env["warden-jwt_auth.token"]
        user_data = UserSerializer.new(resource).serializable_hash[:data][:attributes]
        render json: {
          status: { code: 200, message: "Password reset successfully." },
          user: { data: user_data, token: current_token }
        }, status: :ok
      else
        render json: {
          status: { code: 200, message: "Password reset successfully. You can sign in now." }
        }, status: :ok
      end
    else
      render json: {
        message: resource.errors.full_messages.to_sentence
      }, status: :unprocessable_entity
    end
  end
end
