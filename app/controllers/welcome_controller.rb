class WelcomeController < ApplicationController
  def index
    @inboxes = Inbox.all
  end
end
