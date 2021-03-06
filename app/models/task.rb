class Task < ActiveRecord::Base
  validates :description, :checklist, :creator, presence: true
  validate :done_is_boolean?

  belongs_to :checklist, touch: true
  belongs_to :creator, class_name: "User"
  has_one :project, through: :checklist, source: :project
  has_many :comments, as: :commentable, dependent: :destroy

  has_many :assignments, class_name: "TaskAssignment", dependent: :destroy
  has_many :assigned_users, through: :assignments, source: :user

  private
  def done_is_boolean?
    false unless [TrueClass, FalseClass].include?(self.done)
  end
end
