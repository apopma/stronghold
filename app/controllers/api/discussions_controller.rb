class Api::DiscussionsController < ApplicationController
  def index
    @project = Project.find(params[:project_id])
    @discussions = @project.discussions.includes(:comments)
  end
end
