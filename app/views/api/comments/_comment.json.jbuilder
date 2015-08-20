json.extract! comment, :id, :body, :commentable_id, :commentable_type,
                       :created_at, :updated_at
json.commenter do
  json.partial! "api/users/user", locals: { user: comment.user }
end
