user_view ||= false

json.extract! task, :id, :description, :done
json.deadline task.deadline.strftime("%m/%d/%Y") if task.deadline

if user_view
  # If the current user isn't a member on this task's project,
  # don't even show the view for this task.
  json.not_member? !current_user.projects.include?(task.project)

  json.project do
    json.extract! task.project, :id, :title
  end
end

json.assigned_to do
  json.array! task.assigned_users do |user|
    json.extract! user, :id, :username, :email, :gravatar_url
  end
end

unless user_view
  json.comments task.comments do |comment|
    json.partial! "api/comments/comment", locals: { comment: comment }
  end
end

json.checklist do
  json.extract! task.checklist, :id, :title
end

json.creator do
  json.partial! "api/users/user", locals: { user: task.creator }
end
