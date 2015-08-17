json.extract! @project, :id, :title, :description, :updated_at
json.members @project.members do |member|
  json.extract! member, :id, :username, :email, :gravatar_url
end

json.checklists @project.checklists do |checklist|
  json.extract! checklist, :id, :title, :description

  json.tasks checklist.tasks do |task|
    json.extract! task, :id, :description, :done
    json.deadline task.deadline.strftime("%m/%d/%Y") if task.deadline

    json.assigned_to do
      json.array! task.assigned_users do |user|
        json.extract! user, :id, :username, :email, :gravatar_url
      end
    end
  end
end

json.tasks do
  json.array! @project.tasks do |task|
    json.extract! task, :id, :description, :done
    json.deadline task.deadline.strftime("%m/%d/%Y") if task.deadline

    json.assigned_to do
      json.array! task.assigned_users do |user|
        json.extract! user, :id, :username, :email, :gravatar_url
      end
    end
  end
end

json.is_admin @project.admins.include?(current_user)
