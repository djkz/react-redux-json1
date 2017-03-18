class MessageSerializer < ActiveModel::Serializer  
  include ActionView::Helpers::TextHelper
  attributes :id, :inbox_id, :clean_body

  def clean_body
    simple_format object.body
  end

end
