class Api::TasksController < ApplicationController
  before_action :format_date, only: [:create, :update]
  before_action :require_membership, except: :create
  before_action :require_membership_through_checklist, only: :create
  before_action :require_is_creator_or_admin, only: [:update, :destroy]

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
      @task.assignments.delete_all if params[:destroy_assignees]
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

  def require_membership
    unless current_user.projects.include?(Task.find(params[:id]).project)
      render json: {}, status: 403
    end
  end

  def require_membership_through_checklist
    unless current_user.projects.include?(Checklist.find(params[:checklist_id]).project)
      render json: {}, status: 403
    end
  end

  def require_is_creator_or_admin
    unless current_user.created_tasks.pluck(:id).include?(params[:id].to_i) ||
           current_user.is_admin?(Task.find(params[:id].project))
       render json: {}, status: 403
     end
  end
end
