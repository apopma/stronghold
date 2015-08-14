json.array! @projects do |project|
  json.extract! project, :id, :title, :updated_at
  json.description project.description if project.description

  json.members project.members do |member|
    json.extract! member, :username, :gravatar_url
  end

  json.checklists do
    json.array! project.checklists do |checklist|
      json.extract! checklist, :id, :title, :description

      json.tasks checklist.tasks do |task|
        json.extract! task, :id, :description, :done
        json.deadline task.deadline.strftime("%m/%d/%Y")

        json.assigned_to do
          json.array! task.assigned_users do |user|
            json.extract! user, :id, :username, :email, :gravatar_url
          end
        end
      end
    end
  end
end
