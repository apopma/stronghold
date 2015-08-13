Rails.application.routes.draw do
  root to: "static_pages#root"
  get "/home" => "static_pages#home", as: :home

  namespace :api, defaults: { format: :json } do
    resources :projects, except: [:new, :edit] do
      resources :checklists, only: [:index, :show]
    end

    resources :checklists, only: [:create, :update, :destroy] do
      resources :tasks, only: [:create, :update, :destroy]
    end
    
    resources :project_memberships, only: [:create, :update, :destroy]
  end

  resources :users, only: [:new, :create, :show, :edit, :update]
  resource :session, only: [:new, :create, :destroy]
end
