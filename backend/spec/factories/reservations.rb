# spec/factories/reservations.rb

FactoryBot.define do
  factory :reservation do
    # Define the attributes for the reservation factory here
    # Example:
    association :user
    association :motorcycle
  end
end
