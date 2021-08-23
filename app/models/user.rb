class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :validatable
  has_one :payment
  accepts_nested_attributes_for :payment
  has_many :images

  def full_name
    return "#{first_name} #{last_name}" if first_name || last_name

    'Anonymous'
  end
end
