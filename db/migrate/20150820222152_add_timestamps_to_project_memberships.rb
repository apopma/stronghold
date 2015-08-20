class AddTimestampsToProjectMemberships < ActiveRecord::Migration
  def change
    add_column :project_memberships, :created_at, :datetime, null: false, default: Time.now
    add_column :project_memberships, :updated_at, :datetime, null: false, default: Time.now

    change_column_default :project_memberships, :created_at, nil
    change_column_default :project_memberships, :updated_at, nil
  end
end
