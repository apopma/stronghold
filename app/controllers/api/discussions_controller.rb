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

  def create
    @discussion = current_user.created_discussions.new(discussion_params)

    if @discussion.save
      render :_discussion, locals: { discussion: @discussion }
    else
      render json: @discussion.errors.full_messages, status: 422
    end
  end

  def update
    @discussion = Discussion.find(params[:id])

    if @discussion.update(discussion_params)
      render :_discussion, locals: { discussion: @discussion }
    else
      render json: @discussion.errors.full_messages, status: 422
    end
  end

  def destroy
    @discussion = Discussion.find(params[:id])

    if @discussion.destroy
      render :_discussion, locals: { discussion: @discussion }
    else
      render json: @discussion.errors.full_messages, status: 422
    end
  end

  private
  def discussion_params
    params.require(:discussion).permit(:title, :body, :project_id)
  end
end
