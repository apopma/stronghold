json.memberships do
  json.array! project_memberships do |membership|
    json.extract! membership, :id, :user_id, :admin
  end
end
