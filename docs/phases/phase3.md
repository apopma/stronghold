# Phase 3: Checklists and Tasks

## Rails
### Models
Checklist
Task

### Controllers
Api::ChecklistsController (index, new, create, edit, update, destroy)
ChecklistsController(index, show)
Api::TasksController(index, new, create, edit, update, destroy)
TasksController(show)

### Views
projects/:id/checklists/index.html.erb
projects/:id/checklists/:checklist_id/show.html.erb
projects/:id/tasks/:task_id/show.html.erb

## Backbone
### Models
Checklist, Task

### Collections
Checklists, Tasks

### Views
ChecklistIndex (composite, contains ChecklistShows)
ChecklistShow (composite, contains TaskShows)
TaskShow
ChecklistForm
TaskForm
TaskAssignmentForm

## Gems/Libraries
