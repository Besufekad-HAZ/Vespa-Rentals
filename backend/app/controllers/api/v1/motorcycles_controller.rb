class Api::V1::MotorcyclesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy, :my]

  # Public: list all motorcycles (for browsing)
  def index
    @motorcycles = Motorcycle.includes(:user).order(created_at: :desc)
    render json: @motorcycles.as_json(include: { user: { only: %i[id username] } })
  end

  # Public: show one motorcycle
  def show
    @motorcycle = Motorcycle.includes(:user).find_by(id: params[:id])
    return render json: @motorcycle.as_json(include: { user: { only: %i[id username] } }), status: :ok if @motorcycle

    render json: { message: 'Resource not found' }, status: :not_found
  end

  # Authenticated: list current user's motorcycles
  def my
    @motorcycles = current_user.motorcycles.order(created_at: :desc)
    render json: @motorcycles
  end

  def create
    data = params
    Motorcycle.create!(name: data['name'], model: data['model'], description: data['description'],
                       photo: data['photo'], user: current_user)
    render json: { message: 'Created' }, status: :created
  rescue StandardError
    render json: { message: 'The request parameters are invalid. Please check your input and try again.' },
           status: :unprocessable_entity
  end

  def destroy
    @motorcycle = current_user.motorcycles.find_by(id: params[:id])

    if @motorcycle
      @reservation = Reservation.where(motorcycle: @motorcycle)
      @reservation.destroy_all
      @motorcycle.destroy
      render json: { message: 'Motorcycle deleted successfully' }, status: :ok
    else
      render json: { message: 'Motorcycle not found' }, status: :not_found
    end
  end
end
