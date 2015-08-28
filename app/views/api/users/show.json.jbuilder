json.extract! user, :id, :username, :email, :gravatar_url

if full_info
  json.extract! user, :assigned_tasks, :projects, :comments
end
