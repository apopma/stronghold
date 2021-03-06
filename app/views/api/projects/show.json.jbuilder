json.extract! @project, :id, :title, :description, :updated_at
json.is_admin @project.admins.include?(current_user)
json.members @project.members do |member|
  json.extract! member, :id, :username, :email, :gravatar_url
  json.admin @project.admins.include?(member)
end
json.num_members @project.members.count

json.checklists @project.checklists do |checklist|
  json.partial! "api/checklists/checklist", locals: { checklist: checklist }
end

json.tasks do
  json.array! @project.tasks do |task|
    json.partial! "api/tasks/task", locals: { task: task }
  end
end

json.discussions do
  json.array! @project.discussions do |discussion|
    json.partial! "api/discussions/discussion", locals: { discussion: discussion }
  end
end
