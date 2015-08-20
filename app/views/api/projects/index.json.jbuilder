json.array! @projects do |project|
  json.extract! project, :id, :title, :updated_at
  json.description project.description if project.description

  json.members project.members.take(4) do |member|
    json.extract! member, :id, :username, :gravatar_url
  end

  json.num_members project.members.count
end
