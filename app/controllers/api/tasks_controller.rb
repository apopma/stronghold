class Api::TasksController < ApplicationController
  before_action :format_date, only: [:create, :update]

  def show
    @task = Task.includes(:assigned_users).includes(:project).find(params[:id])
    render :show
  end

  def create
    @task = current_user.created_tasks.new(task_params)
    @task.done = false # could also be a callback?

    if @task.save
      @task.assigned_user_ids = params[:assignees]
      render :show
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def update
    @task = Task.find(params[:id])

    if @task.update(task_params)
      @task.assigned_user_ids = params[:assignees] if params[:assignees]
      render :show
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def destroy
    @task = Task.find(params[:id])
    if @task.destroy
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  private
  def task_params
    params.require(:task).permit(:description, :done, :deadline, :checklist_id)
  end

  def format_date
    if params[:deadline].present?
      params[:deadline] = Date.strptime(params[:deadline], "%m/%d/%Y")
      params[:task][:deadline] = params[:deadline]
    end
  end
end
