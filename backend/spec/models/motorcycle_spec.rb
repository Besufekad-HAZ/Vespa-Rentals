require 'rails_helper'

RSpec.describe Motorcycle, type: :model do
  let(:user) { User.create(username: 'testuser', email: 'testuser@example.com', password: 'password') }
  subject do
    described_class.new(name: 'Test Motorcycle', model: 'Test Model', description: 'Test Description',
                        photo: 'Test Photo', user:)
  end

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(subject).to be_valid
    end

    it 'is not valid without a name' do
      subject.name = nil
      expect(subject).not_to be_valid
    end

    it 'is not valid without a model' do
      subject.model = nil
      expect(subject).not_to be_valid
    end

    it 'is not valid without a description' do
      subject.description = nil
      expect(subject).not_to be_valid
    end

    it 'is not valid without a photo' do
      subject.photo = nil
      expect(subject).not_to be_valid
    end
  end
end
