class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def respond_with(resource, _opts = {})
    if request.method == 'POST' && resource.persisted?
      current_token = request.env['warden-jwt_auth.token']
      user_data = UserSerializer.new(resource).serializable_hash[:data][:attributes]

      render json: {
        status: { code: 200, message: 'Signed up sucessfully.' },
        user: { data: user_data, token: current_token }
      }, status: :ok

    elsif request.method == 'DELETE'
      render json: {
        status: { code: 200, message: 'Account deleted successfully.' }
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: "User couldn't be created successfully.
           #{resource.errors.full_messages.to_sentence}" }
      }, status: :unprocessable_entity
    end
  end
end
