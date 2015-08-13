class CreateChecklists < ActiveRecord::Migration
  def change
    create_table :checklists do |t|
      t.string :title, null: false
      t.text :description
      t.integer :project_id, null: false
      t.integer :creator_id, null: false
      t.boolean :done, null: false, default: false
      t.timestamps null: false
    end

    add_index :checklists, :project_id
    add_index :checklists, :creator_id
  end
end
