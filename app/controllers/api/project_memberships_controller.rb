class Api::ProjectMembershipsController < ApplicationController
  def create
    @project = Project.find(params[:project_id])
    @user = User.find_by_username_or_email(params[:query])
    @membership = ProjectMembership.new(project: @project, user: @user)

    if @membership.save
      render "api/projects/show"
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def destroy

  end
end
