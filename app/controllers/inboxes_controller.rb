class InboxesController < ApplicationController

  def create
    @inbox = Inbox.new inbox_params

    render :json => { :errors => @inbox.errors }, :status => 422 and return unless @inbox.valid?

    @inbox.save

    render json: @inbox
  end

  def show
    @inbox = Inbox.includes(:messages).find params[:id]
    sleep 0.5

    # you can have your hierarchy be as complex as you need here, the api reducer will normalize it 
    render json: @inbox, include: [:messages] 
  end

  private

  def inbox_params
    params.require(:inbox).permit(:name)
  end
end
