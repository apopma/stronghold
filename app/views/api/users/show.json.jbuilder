json.extract! user, :id, :username, :email, :gravatar_url

if full_info
  json.assigned_tasks user.assigned_tasks do |task|
    json.partial! "api/tasks/task", locals: {
      task: task, no_comments: true, with_project: true
    }
  end
end
