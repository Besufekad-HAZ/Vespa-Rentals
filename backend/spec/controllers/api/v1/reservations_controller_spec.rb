# # spec/controllers/api/v1/reservations_controller_spec.rb

# require 'rails_helper'

# RSpec.describe Api::V1::ReservationsController, type: :controller do
#   describe 'GET #index' do
#     it 'returns a success response' do
#       user = create(:user)
#       allow(controller).to receive(:authenticate_user!).and_return(true)
#       allow(controller).to receive(:current_user).and_return(user)

#       get :index

#       expect(response).to have_http_status(:success)
#     end
#   end

#   describe 'GET #show' do
#       it 'returns a success response' do
#         reservation = create(:reservation)

#         get :show, params: { id: reservation.id }

#         expect(response).to have_http_status(:success)
#       end
#     end

#   describe 'POST #create' do
#     it 'creates a new reservation' do
#       user = create(:user)
#       motorcycle = create(:motorcycle)

#       post :create, params: { reservation: { user_id: user.id, motorcycle_id: motorcycle.id } }

#       expect(response).to have_http_status(:created)
#     end
#   end

#   describe 'DELETE #destroy' do
#     it 'deletes the requested reservation' do
#       reservation = create(:reservation)

#       delete :destroy, params: { id: reservation.id }

#       expect(response).to have_http_status(:no_content)
#     end
#   end
# end
