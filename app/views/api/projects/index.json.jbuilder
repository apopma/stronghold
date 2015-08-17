json.array! @projects do |project|
  json.extract! project, :id, :title, :updated_at
  json.description project.description if project.description

  json.members project.members do |member|
    json.extract! member, :username, :gravatar_url
  end
end
