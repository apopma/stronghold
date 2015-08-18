class Comment < ActiveRecord::Base
  validates :user, :body, :commentable, presence: true
  belongs_to :user
  belongs_to :commentable, polymorphic: true
end
