class InboxesController < ApplicationController

  def create
    @inbox = Inbox.new inbox_params

    render :json => { :errors => @inbox.errors }, :status => 422 and return unless @inbox.valid?

    @inbox.save

    render json: @inbox
  end

  private

  def inbox_params
    params.require(:inbox).permit(:name)
  end
end
