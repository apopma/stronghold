# Schema Information

## users
column_name     | data type | details
----------------|-----------|----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
email           | string    | not null, unique(?)
password_digest | string    | not null
session_token   | string    | not null

## projects
column_name | data type | details
------------|-----------|----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users)
title       | string    | not null
description | text      | not null

## project_memberships
A project's creator is automatically an admin for that project.
Enforce uniqueness on [user_id, project_id] combination.
column_name | data type | details
------------|-----------|----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
project_id  | integer   | not null, foreign key (references projects)
admin       | boolean   | not null, default: false

## checklists
column_name | data type | details
------------|-----------|----------------------
id          | integer   | not null, primary key
project_id  | integer   | not null, foreign key (references projects)
creator_id  | integer   | not null, foreign key (references users)
title       | string    | not null
description | text      |
done        | boolean   | not null, default: false
ord         | integer   | for drag-and-drop stretch goal

## tasks
column_name  | data type | details
-------------|-----------|----------------------
id           | integer   | not null, primary key
checklist_id | integer   | not null, foreign key (references checklists)
creator_id   | integer   | not null, foreign key (references users)
description  | string    | not null
done         | boolean   | not null, default: false
deadline     | date      |
ord          | integer   | for drag-and-drop stretch goal

## task_assignments
Enforce uniqueness on [task_id, user_id] combination.
column_name | data type | details
------------|-----------|----------------------
id          | integer   | not null, primary key
task_id     | integer   | not null, foreign key (references tasks)
user_id     | integer   | not null, foreign key (references users)

## comments
Polymorphic association: comments are possible on discussions, checklists,
tasks, text documents, and uploaded files.
column_name      | data type | details
-----------------|-----------|----------------------
id               | integer   | not null, primary key
commenter_id     | integer   | not null, foreign key (references users)
commentable_id   | integer   | not null, polymorphic foreign key
commentable_type | string    | not null, references foreign table
body             | text      | markdown formatting?

## discussions
Basically a comment not attached to any other part of the project.
Does this really need its own table?
column_name | data type | details
------------|-----------|----------------------
id          | integer   | not null, primary key
project_id  | integer   | not null, foreign key (references projects)
creator_id  | integer   | not null, foreign key (references users)
title       | string    | not null
body        | text      | not null
archived    | boolean   | not null, default: false, probably a stretch goal

## text_documents
column_name | data type | details
------------|-----------|----------------------
id          | integer   | not null, primary key
project_id  | integer   | not null, foreign key (references projects)
creator_id  | integer   | not null, foreign key (references users)
title       | string    | not null
body        | text      | markdown formatting?
archived    | boolean   | not null, default: false, probably a stretch goal
ord         | integer   | for drag-and-drop stretch goal

## files
Polymorphic association: files can be associated with projects, checklists,
tasks, comments, or text documents.
Should the file exist persisted to the DB (as ```blob``` or ```bytea``` datatype?), or
should the DB just store a reference to its server-side location, i.e.
in ```app/assets/images``` or some other directory?
column_name       | data type | details
------------------|-----------|----------------------
id                | integer   | not null, primary key
uploader_id       | integer   | not null, foreign key (references users)
path              | string    | not null, unique, references server-side file location
associatable_id   | integer   | not null, polymorphic foreign key
associatable_type | integer   | not null, references foreign table

## labels
column_name | data type | details
------------|-----------|----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## labelings
Join table for file labels.
This might be a polymorphic association as a stretch goal: give
tasks, events, or checklists a particular label, i.e. "Logistics", "Security", "Engineering"...
Enforce uniqueness on [label, file] combination.
No file can have the same label twice, and vice versa.
column_name | data type | details
------------|-----------|----------------------
id          | integer   | not null, primary key
label_id    | integer   | not null, foreign key (references labels)
file_id     | integer   | not null, foreign key (references files)
