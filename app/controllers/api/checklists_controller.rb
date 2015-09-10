class Api::ChecklistsController < ApplicationController
  before_action :require_membership
  before_action :require_is_creator_or_admin, only: [:create, :update, :destroy]

  def index
    @project = Project.find(params[:project_id])
    @checklists = @project.checklists.includes(:tasks)
    render :index
  end

  def show
    @checklist = Checklist.includes(:tasks)
                          .includes(:assigned_users)
                          .find(params[:id])
    render :show
  end

  def create
    @checklist = current_user.created_checklists.new(checklist_params)

    if @checklist.save
      render json: @checklist
    else
      render json: @checklist.errors.full_messages, status: 422
    end
  end

  def update
    @checklist = Checklist.includes(:assigned_users).find(params[:id])

    if @checklist.update(checklist_params)
      render :show
    else
      render json: @checklist.errors.full_messages, status: 422
    end
  end

  def destroy
    @checklist = Checklist.find(params[:id])
    if @checklist.destroy
      render json: @checklist
    else
      render json: @checklist.errors.full_messages, status: 422
    end
  end

  private
  def checklist_params
    params.require(:checklist).permit(:title, :description, :project_id)
  end

  def require_membership
    unless current_user.projects.include?(Checklist.find(params[:id]).project)
      render json: {}, status: 403
   end
  end

  def require_is_creator_or_admin
    unless current_user.created_checklists.pluck(:id).include?(params[:id].to_i) ||
           current_user.is_admin?(Checklist.find(params[:id].project))
       render json: {}, status: 403
     end
  end
end
