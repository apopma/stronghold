json.extract! @project, :id, :title, :description, :updated_at
json.members @project.members do |member|
  json.extract! member, :username, :email, :gravatar_url
end
