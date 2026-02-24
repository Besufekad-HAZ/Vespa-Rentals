class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    current_token = request.env['warden-jwt_auth.token']
    user_data = UserSerializer.new(resource).serializable_hash[:data][:attributes]
    render json: {
      status: { code: 200, message: 'Logged in sucessfully.' },
      user: { data: user_data, token: current_token }
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: 200,
        message: 'logged out successfully'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
