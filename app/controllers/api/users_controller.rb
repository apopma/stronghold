class Api::UsersController < ApplicationController
  def index
    # Fuzzy-search a project's members by username or email, case insensitive.
    if params[:query].present?
      @project = Project.find(params[:project_id])
      results_by_name = @project.members.where("username ~* ?", params[:query])
      results_by_email = @project.members.where("email ~* ?", params[:query])
      @users = (results_by_name.concat results_by_email).uniq
    else
      @users = User.none
    end

    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show, locals: { user: @user }
  end
end
