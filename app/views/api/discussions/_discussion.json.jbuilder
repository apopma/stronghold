json.extract! discussion, :id, :title, :body
json.creator do
  json.partial! "api/users/user", locals: { user: discussion.creator }
end

json.comments do
  json.array! discussion.comments do |comment|
    json.partial! "api/comments/comment", locals: { comment: comment }
  end
end
