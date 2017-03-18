class InboxSerializer < ActiveModel::Serializer  
  attributes :id, :name, :loaded

  def loaded
    true
  end
end
