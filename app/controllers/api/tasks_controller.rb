class Api::TasksController < ApplicationController
  def show
    @task = Task.includes(:assigned_users).includes(:project).find(params[:id])
    render :show
  end

  def create

  end

  def update

  end

  def destroy

  end
end
