class Api::ProjectMembershipsController < ApplicationController
  def index
    @project = Project.find(params[:project_id])
    @memberships = @project.project_memberships
    render :index, locals: { project_memberships: @memberships }
  end

  def create
    @project = Project.find(params[:project_id])
    @user = User.find(params[:user_id])
    @membership = ProjectMembership.new(project: @project, user: @user)

    if @membership.save
      render "api/projects/show"
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def update
    @project = Project.find(params[:project_id])
    @membership = @project.project_memberships.find_by_user_id(params[:user_id])

    if @membership.update(admin: YAML.load(params[:admin])) # convert to boolean
      render :member, locals: { member: @membership.user, membership: @membership }
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def destroy
    @project = Project.find(params[:project_id])
    @membership = @project.project_memberships.find_by_user_id(params[:user_id])

    if @membership.destroy
      render json: @membership
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end
end
