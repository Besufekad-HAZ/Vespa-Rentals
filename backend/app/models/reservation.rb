class Reservation < ApplicationRecord
  belongs_to :user, class_name: 'User'
  belongs_to :motorcycle, class_name: 'Motorcycle'
end
