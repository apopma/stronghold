class CreateProjectsAndMemberships < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.integer :creator_id, null: false
      t.string :title, null: false
      t.text :description
      t.timestamps null: false
    end

    create_table :project_memberships do |t|
      t.integer :user_id, null: false
      t.integer :project_id, null: false
      t.boolean :admin, null: false, default: false
    end

    add_index :projects, :creator_id
    add_index :project_memberships, [:user_id, :project_id], unique: true
  end
end
