class Comment < ActiveRecord::Base
  validates :user, :body, :commentable, presence: true
  belongs_to :user
  belongs_to :commentable, polymorphic: true

  def edited?
    self.created_at != self.updated_at
  end
end
