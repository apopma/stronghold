class Discussion < ActiveRecord::Base
  validates :creator, :project, :title, presence: true
  belongs_to(:creator, class_name: "User")
  belongs_to :project
  has_many :comments, as: :commentable, dependent: :destroy
end
