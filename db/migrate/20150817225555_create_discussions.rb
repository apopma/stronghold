class CreateDiscussions < ActiveRecord::Migration
  def change
    create_table :discussions do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :project_id, null: false
      t.integer :creator_id, null: false
      t.timestamps null: false
    end

    add_index :discussions, :project_id
    add_index :discussions, :creator_id
  end
end
