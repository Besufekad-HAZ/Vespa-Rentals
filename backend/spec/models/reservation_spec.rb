RSpec.describe Reservation, type: :model do
  let(:user) { User.create(username: 'testuser', email: 'testuser@example.com', password: 'password') }
  let(:motorcycle) do
    Motorcycle.create(name: 'Test Motorcycle', model: 'Test Model',
                      description: 'Test Description', photo: 'Test Photo', user:)
  end

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(Reservation.new(user:, motorcycle:, start_date: Date.today.to_s,
                             end_date: Date.tomorrow.to_s)).to be_valid
    end

    it 'is valid without a start date' do
      expect(Reservation.new(user:, motorcycle:, start_date: nil,
                             end_date: Date.tomorrow.to_s)).to be_valid
    end

    it 'is valid without an end date' do
      expect(Reservation.new(user:, motorcycle:, start_date: Date.today.to_s,
                             end_date: nil)).to be_valid
    end

    it 'is not valid without a user' do
      expect(Reservation.new(motorcycle:, start_date: Date.today.to_s,
                             end_date: Date.tomorrow.to_s)).not_to be_valid
    end

    it 'is not valid without a motorcycle' do
      expect(Reservation.new(user:, start_date: Date.today.to_s, end_date: Date.tomorrow.to_s)).not_to be_valid
    end
  end
end
