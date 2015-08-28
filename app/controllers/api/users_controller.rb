class Api::UsersController < ApplicationController
  def index
    if params[:query].present? && params[:project_id].present?
      # Fuzzy-search a project's members by username or email, case insensitive.
      @project = Project.find(params[:project_id])
      @users = @project.members.search(params[:query])
    elsif params[:query].present?
      # Search all users.
      @users = User.search(params[:query])
    else
      @users = User.none
    end

    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show, locals: { user: @user, full_info: true }
  end
end
