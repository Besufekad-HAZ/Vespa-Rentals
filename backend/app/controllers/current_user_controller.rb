class CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def index
    user = UserSerializer.new(current_user).serializable_hash[:data][:attributes]
    render json: user, status: :ok
  end
end
