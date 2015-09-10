class Api::ProjectsController < ApplicationController
  before_action :require_login
  before_action :require_membership, only: [:show, :update, :destroy]
  before_action :require_admin, only: :destroy

  def index
    @projects = current_user.projects.includes(:members)
    render :index
  end

  def show
    @project = Project.includes(:members)
                      .includes(checklists: :comments)
                      .includes(tasks: :comments)
                      .includes(discussions: :comments)
                      .includes(:assigned_users)
                      .find(params[:id])
    render :show
  end

  def create
    @project = current_user.created_projects.new(project_params)
    params[:invitees] = [] if params[:invitees].nil?

    if @project.save
      @project.member_ids = @project.member_ids.concat params[:invitees]
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
    @project = Project.find(params[:id])
    if @project.destroy
      render json: @project
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  private
  def project_params
    params.require(:project).permit(:title, :description)
  end

  def require_membership
    unless current_user.project_memberships
                       .pluck(:project_id)
                       .include?(params[:id].to_i)
      render json: {}, status: 403
    end
  end

  def require_admin
    unless current_user.is_admin?(Project.find(params[:id]))
      render json: {}, status: 403
    end
  end
end
