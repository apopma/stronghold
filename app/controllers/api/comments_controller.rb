class Api::CommentsController < ApplicationController
  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      render "api/comments/_comment", locals: { comment: @comment }
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def update

  end

  private
  def comment_params
    params.require(:comment).permit(:body, :commentable_id, :commentable_type)
  end
end
