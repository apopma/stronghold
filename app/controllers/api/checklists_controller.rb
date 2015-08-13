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

  end

  def update

  end

  def destroy

  end
end
