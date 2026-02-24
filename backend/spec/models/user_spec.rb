require 'rails_helper'

RSpec.describe User, type: :model do
  subject { described_class.new(username: 'testuser', email: 'testuser@example.com', password: 'password') }

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(subject).to be_valid
    end

    it 'is not valid without a username' do
      subject.username = nil
      expect(subject).not_to be_valid
    end
  end
end
