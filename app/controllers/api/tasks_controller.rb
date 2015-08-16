class Api::TasksController < ApplicationController
  def show
    @task = Task.includes(:assigned_users).includes(:project).find(params[:id])
    render :show
  end

  def create
    @task = current_user.created_tasks.new(task_params)
    @task.done = false # could also be a callback?
    if params[:deadline].present? # for whatever reason this can't be mass-assigned
      @task.deadline = Date.strptime(params[:deadline], "%m/%d/%Y")
    end

    if @task.save
      @task.assigned_user_ids = params[:assignees]
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def update

  end

  def destroy

  end

  private
  def task_params
    params.require(:task).permit(:description, :deadline, :checklist_id)
  end
end
