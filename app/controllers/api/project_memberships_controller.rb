class Api::ProjectMembershipsController < ApplicationController
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

  def destroy

  end
end
