class ProjectMembership < ActiveRecord::Base
  belongs_to :user
  belongs_to :project, touch: true

  validates :user, :project, presence: true
end
