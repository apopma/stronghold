json.array! @users do |user|
  json.extract! user, :id, :username, :email, :gravatar_url
end
