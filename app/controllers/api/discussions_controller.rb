class Api::DiscussionsController < ApplicationController
  def index
    @project = Project.find(params[:project_id])
    @discussions = @project.discussions.includes(:comments)
    render :index, locals: { discussions: @discussions }
  end

  def show
    @discussion = Discussion.find(params[:id])
    render :_discussion, locals: { discussion: @discussion }
  end
end
