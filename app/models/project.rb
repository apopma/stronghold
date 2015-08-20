class Project < ActiveRecord::Base
  validates :creator, :title, presence: true
  after_create :set_creator_as_admin

  belongs_to(:creator, class_name: "User")
  has_many :project_memberships, -> { order(:created_at => :desc) }, dependent: :destroy
  has_many :members, through: :project_memberships, source: :user
  has_many :checklists, dependent: :destroy
  has_many :discussions, dependent: :destroy
  has_many :tasks, through: :checklists
  has_many :assigned_users, -> { distinct }, through: :tasks

  def admins
    User.find_by_sql(<<-SQL)
      SELECT u.*
      FROM users u
      JOIN project_memberships pm
      ON pm.user_id = u.id
      WHERE pm.admin IS TRUE
      AND pm.project_id = #{self.id}
    SQL
  end

  private
  def set_creator_as_admin
    ProjectMembership.create!(user: self.creator, project: self, admin: true)
  end
end
