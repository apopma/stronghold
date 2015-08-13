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
    invitees = params[:invitees]
    # strip out current user if exists

    if @project.save
      invitees.map! do |invitee|
        User.find_by_username_or_email(invitee)
      end.compact!

      invitees.each do |invitee|
        ProjectMembership.create!(user: invitee, project: @project)
      end

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
