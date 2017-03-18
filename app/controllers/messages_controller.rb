class MessagesController < ApplicationController

  def create
    @message = Message.new message_params

    render :json => { :errors => @message.errors }, :status => 422 and return unless @message.valid?

    @message.save

    render json: @message
  end

  private

  def message_params
    params.require(:message).permit(:inbox_id, :body)
  end
end
