class TaskAssignment < ActiveRecord::Base
  validates :task, :user, :project, presence: true
  validate :user_is_project_member

  belongs_to :task
  belongs_to :user
  has_one :project, through: :task, source: :project

  private
  def user_is_project_member
    unless self.project.members.include?(self.user)
      errors[:base] << "#{user.username} is not a member of '#{project.title}'"
    end
  end
end
