json.extract! checklist, :id, :title, :description
json.creator do
  json.partial! "api/users/user", locals: { user: checklist.creator }
end

json.tasks checklist.tasks do |task|
  json.partial! "api/tasks/task", locals: { task: task }
end

json.comments checklist.comments do |comment|
  json.partial! "api/comments/comment", locals: { comment: comment }
end
