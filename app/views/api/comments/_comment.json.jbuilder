json.extract! comment, :id, :body, :commentable_id, :commentable_type
json.commenter do
  render template: "api/users/show", locals: { user: comment.user }
end
