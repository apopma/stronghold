class Project < ActiveRecord::Base
  validates :creator, :title, presence: true
  after_create :set_creator_as_admin

  belongs_to(:creator, class_name: "User")
  has_many :project_memberships
  has_many :members, through: :project_memberships, source: :user

  private
  def set_creator_as_admin
    ProjectMembership.create!(user: self.creator, project: self, admin: true)
  end
end
