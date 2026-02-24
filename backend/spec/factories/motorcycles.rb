FactoryBot.define do
  factory :motorcycle do
    name { 'Test Motorcycle' }
    model { 'Test Model' }
    description { 'Test Description' }
    make { 'Test Make' }
    association :photo, factory: :photo

    # Add any other attributes or associations related to the motorcycle factory here
  end
end
