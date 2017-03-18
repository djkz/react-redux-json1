class InboxSerializer < ActiveModel::Serializer  
  attributes :id, :name, :loaded

  has_many :messages

  def loaded
    true
  end
end
