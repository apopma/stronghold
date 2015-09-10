class Api::CommentsController < ApplicationController
  before_action :require_membership
  before_action :require_is_creator_or_admin, except: :create

  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      render "api/comments/_comment", locals: { comment: @comment }
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def update
    @comment = Comment.find(params[:id])

    if @comment.update(comment_params)
      render "api/comments/_comment", locals: { comment: @comment }
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])

    if @comment.destroy
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :commentable_id, :commentable_type)
  end

  def require_membership
    unless current_user.project_memberships
                       .include?(Comment.find(params[:id]).project)
      render json: {}, status: 403
   end
  end

  def require_is_creator_or_admin
    unless current_user.created_comments.pluck(:id).include?(params[:id].to_i) ||
           current_user.is_admin?(Comment.find(params[:id].project))
       render json: {}, status: 403
     end
  end
end
