json.array! @checklists do |checklist|
  json.partial! "api/checklists/checklist", locals: { checklist: checklist }
end
