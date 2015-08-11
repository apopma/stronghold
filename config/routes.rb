Rails.application.routes.draw do
  root to: "static_pages#root"
  get "/home" => "static_pages#home", as: :home

  namespace :api, defaults: { format: :json } do
    resources :projects
  end

  resources :users, only: [:new, :create, :show, :edit, :update]
  resource :session, only: [:new, :create, :destroy]
end
