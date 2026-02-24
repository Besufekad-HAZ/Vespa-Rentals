require 'swagger_helper'

RSpec.describe 'API', type: :request do
  def retrieve_all_motorcycles
    path '/api/v1/motorcycles' do
      get 'Retrieve all motorcycles' do
        tags 'Motorcycles'
        produces 'application/json'

        response '200', 'OK' do
          examples 'application/json' => [
            {
              id: 1,
              name: 'Motorcycle 1',
              model: 'Model 1',
              description: 'Description 1',
              photo: 'Photo 1',
              user_id: 1
            },
            {
              id: 2,
              name: 'Motorcycle 2',
              model: 'Model 2',
              description: 'Description 2',
              photo: 'Photo 2',
              user_id: 1
            }
          ]

          run_test!
        end

        response '404', 'Resource not found' do
          run_test!
        end
      end
    end
  end

  def create_motorcycle
    path '/api/v1/motorcycles' do
      post 'Create a motorcycle' do
        tags 'Motorcycles'
        consumes 'application/json'
        parameter name: :motorcycle, in: :body, schema: {
          type: :object,
          properties: {
            name: { type: :string },
            model: { type: :string },
            description: { type: :string },
            photo: { type: :string }
          },
          required: %w[name model description photo]
        }

        response '201', 'Created' do
          run_test!
        end

        response '422', 'Unprocessable Entity' do
          run_test!
        end
      end
    end
  end

  def retrieve_specific_motorcycle
    path '/api/v1/motorcycles/{id}' do
      parameter name: :id, in: :path, type: :integer, required: true

      get 'Retrieve a specific motorcycle' do
        tags 'Motorcycles'
        produces 'application/json'

        response '200', 'OK' do
          schema type: :object,
                 properties: {
                   id: { type: :integer },
                   name: { type: :string },
                   model: { type: :string },
                   description: { type: :string },
                   photo: { type: :string },
                   user_id: { type: :integer }
                 },
                 required: %w[id name model description photo user_id]

          run_test!
        end

        response '404', 'Resource not found' do
          run_test!
        end
      end

      delete 'Delete a motorcycle' do
        tags 'Motorcycles'

        response '200', 'OK' do
          run_test!
        end

        response '404', 'Resource not found' do
          run_test!
        end
      end
    end
  end

  def retrieve_all_reservations
    path '/api/v1/reservations' do
      get 'Retrieve all reservations' do
        tags 'Reservations'
        produces 'application/json'

        response '200', 'OK' do
          examples 'application/json' => [
            {
              id: 1,
              start_date: '2023-09-25',
              end_date: '2023-09-28',
              city: 'City 1',
              user_id: 1,
              motorcycle_id: 1
            },
            {
              id: 2,
              start_date: '2023-10-01',
              end_date: '2023-10-05',
              city: 'City 2',
              user_id: 1,
              motorcycle_id: 2
            }
          ]

          run_test!
        end
      end
    end
  end

  def create_reservation
    path '/api/v1/reservations' do
      post 'Create a reservation' do
        tags 'Reservations'
        consumes 'application/json'
        parameter name: :reservation, in: :body, schema: {
          type: :object,
          properties: {
            start_date: { type: :string, format: 'date' },
            end_date: { type: :string, format: 'date' },
            city: { type: :string },
            user_id: { type: :integer },
            motorcycle_id: { type: :integer }
          },
          required: %w[start_date end_date city user_id motorcycle_id]
        }

        response '201', 'Created' do
          run_test!
        end

        response '422', 'Unprocessable Entity' do
          run_test!
        end
      end
    end
  end

  def retrieve_specific_reservation
    path '/api/v1/reservations/{id}' do
      parameter name: :id, in: :path, type: :integer, required: true

      get 'Retrieve a specific reservation' do
        tags 'Reservations'
        produces 'application/json'

        response '200', 'OK' do
          schema type: :object,
                 properties: {
                   id: { type: :integer },
                   start_date: { type: :string, format: 'date' },
                   end_date: { type: :string, format: 'date' },
                   city: { type: :string },
                   user_id: { type: :integer },
                   motorcycle_id: { type: :integer }
                 },
                 required: %w[id start_date end_date city user_id motorcycle_id]

          run_test!
        end

        response '404', 'Resource not found' do
          run_test!
        end
      end

      delete 'Delete a reservation' do
        tags 'Reservations'

        response '204', 'No Content' do
          run_test!
        end
      end
    end
  end

  retrieve_all_motorcycles
  create_motorcycle
  retrieve_specific_motorcycle
  retrieve_all_reservations
  create_reservation
  retrieve_specific_reservation
end
