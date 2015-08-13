class Checklist < ActiveRecord::Base
  validates :title, :project, :creator, presence: true
  belongs_to :creator, class_name: "User"
  belongs_to :project
end
