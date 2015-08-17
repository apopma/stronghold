class Discussion < ActiveRecord::Base
  validates :creator, :project, :title, :body, presence: true
  belongs_to(:creator, class_name: "User")
  belongs_to :project
end
