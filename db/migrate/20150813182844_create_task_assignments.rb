class CreateTaskAssignments < ActiveRecord::Migration
  def change
    create_table :task_assignments do |t|
      t.integer :task_id, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end

    add_index :task_assignments, [:task_id, :user_id], unique: true
  end
end
