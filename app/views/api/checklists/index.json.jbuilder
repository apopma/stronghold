json.array! @checklists do |checklist|
  json.extract! checklist, :id, :title, :description
  json.tasks checklist.tasks do |task|
    json.partial! "api/tasks/task", locals: { task: task }
  end
end
