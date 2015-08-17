class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates_uniqueness_of :username, :email

  after_initialize :ensure_session_token!
  before_save :set_gravatar!
  before_update :set_gravatar!

  has_many :projects, through: :project_memberships, source: :project
  has_many :project_memberships, dependent: :destroy

  has_many(:created_projects,
    class_name: "Project", foreign_key: "creator_id", dependent: :destroy)
  has_many(:created_checklists,
    class_name: "Checklist", foreign_key: "creator_id", dependent: :destroy)
  has_many(:created_tasks,
    class_name: "Task", foreign_key: "creator_id", dependent: :destroy)
  has_many(:created_discussions,
    class_name: "Discussion", foreign_key: "creator_id", dependent: :destroy)

  has_many :assigned_tasks, through: :task_assignments, source: :task
  has_many :task_assignments, dependent: :destroy

  has_many :comments

  def self.find_by_credentials(creds)
    usr = User.find_by_username(creds[:username])
    usr && usr.is_password?(creds[:password]) ? usr : nil
  end

  def self.find_by_username_or_email(query)
    User.find_by_username(query) || User.find_by_email(query)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def new_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = new_session_token
    self.save!
    self.session_token
  end

  private
  def set_gravatar!
    # Gravatar wants emails hashed as all-lowercase and free of whitespace
    gravatar_hash = Digest::MD5.hexdigest("#{self.email.strip.downcase}")
    self.gravatar_url = "http://gravatar.com/avatar/#{gravatar_hash}"
  end

  def ensure_session_token!
    self.session_token ||= new_session_token
  end
end
