class Api::UsersController < ApplicationController
  def index
    if params[:query].present?
      @project = Project.find(params[:project_id])
      results_by_name = @project.members.where("username ~ ?", params[:query])
      results_by_email = @project.members.where("email ~ ?", params[:query])
      @users = (results_by_name.concat results_by_email).uniq!
    else
      @users = User.none
    end

    render :index
  end
end
