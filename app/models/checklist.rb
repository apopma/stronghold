class Checklist < ActiveRecord::Base
  validates :title, :project, :creator, presence: true
  belongs_to :creator, class_name: "User"
  belongs_to :project, touch: true
  has_many :tasks, dependent: :destroy
  has_many :assigned_users, -> { distinct }, through: :tasks
  has_many :comments, as: :commentable, dependent: :destroy
end
