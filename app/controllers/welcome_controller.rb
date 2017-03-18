class WelcomeController < ApplicationController
  def index
    @inboxes = [ { id: 1, name: "Test" }, { id: 2, name: "Test2" } ]
  end
end
