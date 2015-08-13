json.extract! task, :id, :description, :deadline, :done
json.assigned_to do
  json.array! task.assigned_users do |user|
    json.extract! user, :id, :username, :email, :gravatar_url
  end
end
