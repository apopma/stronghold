json.array! @projects do |project|
  json.id project.id
  json.title project.title
  json.description project.description if project.description

  json.members project.members do |member|
    json.extract! member, :username, :gravatar_url
  end

  json.updated_at project.updated_at
end
