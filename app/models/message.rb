class Message < ApplicationRecord
  belongs_to :inbox

  validates :body, presence: true
end
