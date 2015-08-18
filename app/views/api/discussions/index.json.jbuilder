json.array! discussions do |discussion|
  json.partial! "api/discussions/discussion", locals: { discussion: discussion }
end
