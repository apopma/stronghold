json.extract! comment, :id, :body, :commentable_id, :commentable_type
json.commenter do
  json.partial! "api/users/user", locals: { user: comment.user }
end
