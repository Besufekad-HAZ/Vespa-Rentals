# # spec/controllers/api/v1/motorcycles_controller_spec.rb

# require 'rails_helper'

# RSpec.describe Api::V1::MotorcyclesController, type: :controller do
#   describe 'GET #index' do
#     it 'returns a success response' do
#       user = create(:user)
#       sign_in user

#       get :index
#       expect(response).to have_http_status(:success)
#     end
#   end

#   describe 'GET #show' do
#     it 'returns a success response' do
#       user = create(:user)
#       motorcycle = create(:motorcycle, user: user, photo: 'dummy_photo')
#       sign_in user

#       get :show, params: { id: motorcycle.id }

#       expect(response).to have_http_status(:success)
#     end
#   end

#   # This is another test for the POST #create action of the motorcycles controller
# # This test uses a different approach to create and pass the valid parameters
# # This test only checks the response status and the motorcycle count

#   describe 'DELETE #destroy' do
#     it 'deletes the requested motorcycle' do
#       user = create(:user)
#       sign_in user

#       motorcycle = create(:motorcycle, user: user, photo: 'dummy_photo')

#       expect {
#         delete :destroy, params: { id: motorcycle.id }
#       }.to change(Motorcycle, :count).by(-1)

#       expect(response).to have_http_status(:ok)
#     end
#   end
# end
