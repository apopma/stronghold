class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.text :description, null: false
      t.boolean :done, null: false, default: false
      t.date :deadline
      t.integer :checklist_id, null: false
      t.integer :creator_id, null: false
      t.timestamps null: false
    end

    add_index :tasks, :checklist_id
    add_index :tasks, :creator_id
  end
end
