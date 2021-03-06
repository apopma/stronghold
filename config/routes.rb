Rails.application.routes.draw do
  root to: "static_pages#root"
  get "/home" => "static_pages#home", as: :home

  namespace :api, defaults: { format: :json } do

    resources :projects, except: [:new, :edit] do
      resources :users, only: :index
      resources :checklists, only: :index
      resources :discussions, only: [:index, :show]
      resources :tasks, only: :show
      resources :project_memberships, only: :index
    end

    resources :users, only: [:index, :show]
    resources :discussions, only: [:show, :create, :update, :destroy]
    resources :checklists, only: [:show, :create, :update, :destroy]
    resources :tasks, only: [:show, :create, :update, :destroy]
    resources :comments, only: [:create, :update, :destroy]

    resources :task_assignments, only: [:create, :update, :destroy]
    resources :project_memberships, only: [:create]
    delete 'project_memberships', to: 'project_memberships#destroy'
    patch 'project_memberships', to: 'project_memberships#update'
  end

  resources :users, only: [:new, :create, :edit, :update]
  get "guest", to: "users#guest", as: "guest_signin"
  resource :session, only: [:new, :create, :destroy]
end
