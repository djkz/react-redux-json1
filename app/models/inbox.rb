class Inbox < ApplicationRecord
  validates :name, presence: true

  has_many :messages
end
