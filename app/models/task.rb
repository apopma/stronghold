class Task < ActiveRecord::Base
  validates :description, :checklist, :creator, :done, presence: true
  belongs_to :checklist
  belongs_to :creator, class_name: "User"
  has_one :project, through: :checklist

  has_many :assignments, class_name: "TaskAssignment"
  has_many :assigned_users, through: :assignments, source: :user
end
