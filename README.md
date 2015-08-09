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
- [] Post comments:
  - [] On a discussion board
  - [] On a to-do list
  - [] On a task
  - [] On a text document
  - [] As replies to top-level postings
- [] Invite other users to projects via email
- [] Be invited to another user's project via email
- [] Attach files from the local filesystem:
  - [] To the project itself
  - [] To a to-do list or checklist item
  - [] To a comment
  - [] Tag files with a text label
- [] Search projects
  - [] For todo lists, tasks, documents, and files
  - [] Filter searches by project, component, and associated user
  - [] Search in a particular project, or all projects
- [] Post text documents:
  - [] Formattable using Markdown, or an in-line editor


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
I may also add a Rails route to serve data for a dedicated checklists index page,
instead of only displaying this information at the project index level.
[Details][phase-three]

### Phase 4: Comments (~2 days)

[Details][phase-four]

### Phase 5: Invites (~2 days)
I'll implement a Rails route to display a form for inviting new or existing users to a project.
Users can type email addresses or existing usernames into a text field; this field will automatically
add new columns as more addresses are entered. Admins and the project owner have the ability to set
administrator flags on invitees, giving that user the ability to set admin powers on other users,
invite new users, and delete existing users from a project.

Invitees will receive a welcome email; upon clicking
a link in the email, they'll be routed to a welcome page asking them to sign up or sign in.
After authentication, the user will be added to this project with relevant flags set.
While Basecamp has a hierarchy extending beyond projects (accounts have an owner and many associated projects/users,
and account owners have super-admin rights on all associated projects),
I won't. Any user can create projects, invite users to projects they created or are admins on,
and be invited to an existing project.
[Details][phase-five]

### Bonus Features (TBD)
- [] Users can drag and drop checklists and task items using jQuery UI
- [] Create calendar events for a project
  - [] Receive email reminders at a specified time before the event
  - [] Filter calendar events by project, or view all events
  - [] Users can re-order calendar events, too
- [] Integrate Google accounts:
  - [] Users with a Google account can upload files from Google Drive
  - [] When a user signs up, try to sign them into Google with those credentials
  - [] If it actually works, send them a helpful email about password security; then promptly delete their info from the DB
- [] Email notifications
- [] Breadcrumbs: show the route a user took to get to a certain page
- [] Multiple users can edit a text document concurrently
- [] Administrator and project-creator flags on users
  - [] Tie projects and users to an account with one owner
- [] "Everything" pages for all of a user's projects: files, comments, etc.
- [] Historical data for darn near everything
- [] Timeline view for a given project, or for all of a user's projects

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
