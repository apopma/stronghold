class Api::ChecklistsController < ApplicationController
  def index
    @project = Project.find(params[:project_id])
    @checklists = @project.checklists.includes(:tasks)
    render :index
  end

  def show
    @checklist = Checklist.includes(:tasks).find(params[:id])
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

  end

  def destroy

  end

  private
  def checklist_params
    params.require(:checklist).permit(:title, :description, :project_id)
  end
end
