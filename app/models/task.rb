class Task < ActiveRecord::Base
  validates :description, :checklist, :creator, presence: true
  belongs_to :checklist
  belongs_to(:creator, class_name: "User")
end
