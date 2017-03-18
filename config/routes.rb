Rails.application.routes.draw do
  resources :inboxes, :defaults => { :format => :json }

  root to: 'welcome#index'
end
