class Api::ChecklistsController < ApplicationController
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
end
