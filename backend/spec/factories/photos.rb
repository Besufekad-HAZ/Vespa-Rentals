FactoryBot.define do
  factory :photo do
    image { Rack::Test::UploadedFile.new(Rails.root.join('spec', 'fixtures', 'motor.jpg'), 'image/jpeg') }
  end
end
