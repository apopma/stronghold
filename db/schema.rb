# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150820222152) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "checklists", force: :cascade do |t|
    t.string   "title",       null: false
    t.text     "description"
    t.integer  "project_id",  null: false
    t.integer  "creator_id",  null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "checklists", ["creator_id"], name: "index_checklists_on_creator_id", using: :btree
  add_index "checklists", ["project_id"], name: "index_checklists_on_project_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",          null: false
    t.text     "body",             null: false
    t.integer  "commentable_id",   null: false
    t.string   "commentable_type", null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "comments", ["commentable_id"], name: "index_comments_on_commentable_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "discussions", force: :cascade do |t|
    t.string   "title",      null: false
    t.text     "body",       null: false
    t.integer  "project_id", null: false
    t.integer  "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "discussions", ["creator_id"], name: "index_discussions_on_creator_id", using: :btree
  add_index "discussions", ["project_id"], name: "index_discussions_on_project_id", using: :btree

  create_table "project_memberships", force: :cascade do |t|
    t.integer  "user_id",                    null: false
    t.integer  "project_id",                 null: false
    t.boolean  "admin",      default: false, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "project_memberships", ["user_id", "project_id"], name: "index_project_memberships_on_user_id_and_project_id", unique: true, using: :btree

  create_table "projects", force: :cascade do |t|
    t.integer  "creator_id",  null: false
    t.string   "title",       null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "projects", ["creator_id"], name: "index_projects_on_creator_id", using: :btree

  create_table "task_assignments", force: :cascade do |t|
    t.integer  "task_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "task_assignments", ["task_id", "user_id"], name: "index_task_assignments_on_task_id_and_user_id", unique: true, using: :btree

  create_table "tasks", force: :cascade do |t|
    t.text     "description",                  null: false
    t.boolean  "done",         default: false, null: false
    t.date     "deadline"
    t.integer  "checklist_id",                 null: false
    t.integer  "creator_id",                   null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "tasks", ["checklist_id"], name: "index_tasks_on_checklist_id", using: :btree
  add_index "tasks", ["creator_id"], name: "index_tasks_on_creator_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",                                                                      null: false
    t.string   "email",           limit: 1024,                                                  null: false
    t.string   "password_digest",                                                               null: false
    t.string   "session_token",                                                                 null: false
    t.string   "gravatar_url",                 default: "http://www.gravatar.com/avatar/?d=mm", null: false
    t.datetime "created_at",                                                                    null: false
    t.datetime "updated_at",                                                                    null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
