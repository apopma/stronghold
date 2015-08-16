Rails.application.routes.draw do
  root to: "static_pages#root"
  get "/home" => "static_pages#home", as: :home

  namespace :api, defaults: { format: :json } do

    resources :projects, except: [:new, :edit] do
      resources :users, only: :index
      resources :checklists, only: :index
      resources :tasks, only: :show
    end

    resources :users, only: :show
    resources :checklists, only: [:show, :create, :update, :destroy]
    resources :tasks, only: [:create, :update, :destroy]
    resources :task_assignments, only: [:create, :update, :destroy]
    resources :project_memberships, only: [:create, :update, :destroy]
  end

  resources :users, only: [:new, :create, :show, :edit, :update]
  resource :session, only: [:new, :create, :destroy]
end
