class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false, limit: 1024
      t.string :password_digest, null: false
      t.string :session_token, null: false, unique: true
      t.string :gravatar_url, null: false, default: 'http://www.gravatar.com/avatar/?d=mm'
      t.timestamps null: false
    end

    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
