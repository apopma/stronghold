json.array! discussions do |discussion|
  json.extract! discussion, :id, :title, :body

  json.comments do
    json.array! discussion.comments do |comment|
      json.partial! "api/comments/comment", locals: { comment: comment }
    end
  end
end
