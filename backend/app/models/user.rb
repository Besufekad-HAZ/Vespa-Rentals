class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :motorcycles
  has_many :reservations

  validates :username, presence: true

  #   attribute :created_date do |user|
  #     user.created_at && user.created_at.strftime('%m/%d/%Y')
  #   end
end
