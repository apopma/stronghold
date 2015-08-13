class Api::ProjectsController < ApplicationController
  before_action :require_login

  def index
    @projects = current_user.projects.includes(:members)
    render :index
  end

  def show
    # many includes associations to come in future phases
    @project = Project.find(params[:id])
    render :show
  end

  def create
    @project = Project.new(project_params)
    @project.creator = current_user

    if @project.save
      invitee_ids = User.where(username: params[:invitees]).pluck(:id)
      @project.member_ids = @project.member_ids.concat invitee_ids

      render :show
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def update
    @project = Project.find(params[:id])

    if @project.update(project_params)
      render :show
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def destroy

  end

  private
  def project_params
    params.require(:project).permit(:title, :description)
  end
end
