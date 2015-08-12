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

  def new

  end

  def create

  end

  def edit

  end

  def update

  end

  def destroy

  end

  private
  def project_params

  end
end
