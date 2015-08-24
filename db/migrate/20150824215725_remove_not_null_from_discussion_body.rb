class RemoveNotNullFromDiscussionBody < ActiveRecord::Migration
  def change
    change_column_null :discussions, :body, true
  end
end
