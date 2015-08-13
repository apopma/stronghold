class Project < ActiveRecord::Base
  validates :creator, :title, presence: true
  after_create :set_creator_as_admin

  belongs_to(:creator, class_name: "User")
  has_many :project_memberships, dependent: :destroy
  has_many :members, through: :project_memberships, source: :user
  has_many :checklists, dependent: :destroy

  private
  def set_creator_as_admin
    ProjectMembership.create!(user: self.creator, project: self, admin: true)
  end
end
