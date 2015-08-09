# Stronghold

[Heroku link][heroku]

[heroku]: http://stronghold.herokuapp.com

## Minimum Viable Product

Stronghold is a clone of Basecamp built by and for supervillains. Users can:

- [] Create accounts
- [] Login and logout
- [] Create projects
- [] Create to-do checklists for a project
    - [] Add individual tasks within a checklist
    - [] Assign tasks to zero or more users
    - [] Assign deadlines to tasks
- [] Invite other users to projects via email
- [] Be invited to another user's project via email
- [] Post comments:
  - [] On a discussion board
  - [] On a to-do list
  - [] On a task
  - [] On a text document
  - [] As replies to top-level postings
- [] Attach files from the local filesystem:
  - [] To the project itself
  - [] To a to-do list or checklist item
  - [] To a comment
  - [] Tag files with a text label
- [] Post text documents:
  - [] Formattable using Markdown, or an in-line editor
- [] Search projects
  - [] For todo lists, tasks, documents, and files
  - [] Filter searches by project, component, and associated user
  - [] Search in a particular project, or all projects


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Auth, Sessions, Heroku (~1 day)
I'll implement authentication using BCrypt and cookie-based logins using the
Rails patterns we've already learned. Upon completion, users will be able to
create an account, log into it, and log out. I'll also stub out
the top-level landing page for the app, from which Backbone will boot,
and get a live version running on Heroku.
[Details][phase-one]

### Phase 2: Projects (~1 day)
I'll implement RESTful routes for projects using Backbone, which users can create after login.
Users can create new projects, view the show pages for existing ones, and edit or delete
projects they've created, or that they have admin rights to.
The show page for a project will display all the important components
of that project: its checklists, discussions, text documents, and attached files.
These will be stubs at first, but gradually fleshed out in future phases.
[Details][phase-two]

### Phase 3: Checklists and Tasks (~2-3 days)
Once projects are up and running, I'll begin work on the core featureset of the app.
API routes to serve checklist and task data will come first, then the ChecklistsIndex composite subview,
visible from the ProjectIndex page. This view will contain the six most
recently-updated checklists (or all of them, if fewer than six exist),
and ChecklistIndexItem/ChecklistTaskItem sub-subviews to live inside the ChecklistsIndex.
Creation/editing/deleting of checklists and tasks will be implemented using form subviews in Backbone.

I'll then add new Rails routes to serve HTML data for checklist and task show pages,
which in future phases will serve as places for comments and associated files to live.
[Details][phase-three]

### Phase 4:
[Details][phase-four]

### Phase 5:
[Details][phase-five]

### Bonus Features (TBD)
- [] Users can re-order to-do lists and tasks using drag-and-drop
- [] Create calendar events for a project
  - [] Receive email reminders at a specified time before the event
  - [] Filter calendar events by project, or view all events
  - [] Users can re-order calendar events, too
- [] Integrate Google accounts:
  - [] Users with a Google account can upload files from Google Drive
  - [] When a user signs up, try to sign them into Google with those credentials
  - [] If it actually works, send them a helpful email about infosec
- [] Email notifications
- [] Multiple users can edit a text document concurrently
- [] "Everything" pages for all of a user's projects: files, comments, etc.
- [] Historical data for darn near everything
- [] Timeline view for a given project, or for all of a user's projects

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
