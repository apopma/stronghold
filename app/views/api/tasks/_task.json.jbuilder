json.extract! task, :id, :description, :done
json.deadline task.deadline.strftime("%m/%d/%Y") if task.deadline

json.assigned_to do
  json.array! task.assigned_users do |user|
    json.extract! user, :id, :username, :email, :gravatar_url
  end
end

json.checklist do
  json.extract! task.checklist, :id, :title
end
