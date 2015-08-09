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
    - [] Assign tasks to a particular user
    - [] Assign deadlines to tasks
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

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Auth, Sessions, Heroku (~1 day)
I'll implement authentication using BCrypt and cookie-based logins using the Rails patterns we've already learned. Upon completion, users will be able to create an account, log into it, and log out. Once logged in, users can edit their information and view information for them and other users. In future phases, a user's show page will also display which tasks are assigned to them and which have been completed. I'll also stub out the top-level landing page for the app, from which Backbone will boot, and get a live version running on Heroku.
[Details][phase-one]

### Phase 2: Projects (~1 day)
I'll implement RESTful routes for projects using Backbone, which users can create after login. Users can create new projects, view the show pages for existing ones, and edit or delete projects they've created, or that they have admin rights to. The show page for a project will display all the important components of that project: its checklists, discussions, text documents, and attached files. These will be stubs at first, but gradually fleshed out in future phases.

If I can get through searching and drag-and-drop as stretch goals, I'll also add the ability for users to invite other users to their projects, either from an existing account or from an email address. Until then, I'll manually seed the DB with fake project-users, and, upon signup, automatically add the new user to a demo project or two with this seed data already present.
[Details][phase-two]

### Phase 3: Checklists and Tasks (~2-3 days)
Once projects are up and running, I'll begin work on the core featureset of the app. API routes to serve checklist and task data will come first, then the ChecklistsIndex composite subview, visible from the ProjectIndex page. This view will contain the six most recently-updated checklists (or all of them, if fewer than six exist), and ChecklistIndexItem/ChecklistTaskItem sub-subviews to live inside the Checklist Index. Creation/editing/deleting of checklists and tasks will be implemented using form subviews in Backbone.

I'll implement a Backbone subview to reassign users and deadlines to tasks, visible by clicking a button inside a task partial. This partial will contain a dropdown and a calendar, and a submit button which will update the database with the assignment and deadline once the user has made their selection. Users will also be able to set this info from the TaskForm subview. The assigned user and deadline will be visible from the task subview, and clicking on this information will reopen the assignment subview.

I'll then add new Rails routes to serve HTML data for checklist and task show pages, which in future phases will serve as places for comments and associated files to live. I may also add a Rails route to serve data for a dedicated checklists index page, instead of only displaying this information at the project index level.
[Details][phase-three]

### Phase 4: Comments and Discussions (~2-3 days)
I'll implement a polymorphic comment model which will live in several portions of the app. Discussions will come first: still basically a comment, but one which is only attached to a project. A subview for this will be visible at the project index page and at a discussions index page. I'll use an updated version of the WYSIHTML library Basecamp uses to allow users to format their discussion and comment bodies nicely, and Font Awesome to give the formatting options a good-looking GUI.

Once discussions are up and running, I'll add the ability to add comments to a discussion. Users can see all the comments for a discussion from its show page, and add a new comment using an inline Backbone form. No nested replies will be implemented: there are only discussions (or other commentable things) and a list of comments for that commentable.

After comments on discussions are working, I'll implement the same functionality on checklists and tasks. Users will be able to comment on a checklist or any of its component tasks, and these comments will be visible from the checklist or task's show page.
[Details][phase-four]

### Phase 5: Style! (~2 days)
Checklists, tasks, and comments are the core of this app. Once they're implemented to my satisfaction, I'll start making things look pretty. I'll piggyback on Bootstrap and implement a consistent color scheme and font style across the entire app. Index and show pages will use Bootstrap's grid feature to display everything nicely on the page, and clickable UI elements (task reassignments, links, buttons) will display visual feedback to the user that something has happened.

Where applicable, I'll also style flashes from Rails (probably form errors), although most of the real-time feedback will be through instantly posting Backbone views to the DOM. And, just for flavor, I'll write some static pages - home, about, contact us - that explain to the interested supervillain just /why/ they might want a web app to manage their next nefarious scheme.
[Details][phase-five]

### Phase 6: File Uploads with Labels (~2-3 days, time permitting)
I'll implement the ability for users to upload files to a project. I'm not yet sure what I could do to implement this - there seem to be several possible solutions. What I want is to have a clickable button, visible in several places (new task creation form, task partial within a checklist view, new comment form, project files index) which, when clicked, opens up a dialogue for the user to select a file from their local filesystem. The file won't be stored until the new task or comment has actually been persisted to the database. Users will also be able to access a project-level file upload form, to upload files not associated with any particular checklist, task, or comment. Files will be commentable and have their own show page if uploaded to a project; otherwise, they'll be seen as part of the comments for a commentable.

Users can tag files with text labels before or after upload; if the label doesn't exist upon tagging, it'll be created when the file is uploaded. After a label's created, users will be able to view a show page for the label by clicking on its element, which will display subviews for all files tagged with that label. Label show pages will also expose a subview for users to change the label's name or delete it. Deleted labels are removed from all files so labeled, and a label with no files associated with it will automatically be deleted.

For ease of workflow, the partial to upload a file should probably be a Backbone subview, but handling asynchronous file uploads from Backbone seems difficult at best. I see several gems to handle uploading (like Paperclip), but these look like they only work in the Rails world, not from a Backbone XHR. Cloudinary also looks like they offer plugins for jQuery and Rails to handle uploads, either to the server and then to their cloud, or straight to the cloud via browser - but they only handle images, and I'd like to support uploading of documents like PDFs and spreadsheets, as well as images. When this is seen: could I get some advice on how best to handle this?
[Details][phase-six]

### Bonus Features (TBD)
- [] Search projects
  - [] For todo lists, tasks, users, documents, and files
  - [] Filter searches by project, component, and associated user
  - [] Search in a particular project, or all projects

- [] Users can drag and drop checklists and task items using jQuery UI
- [] Users can invite other users to projects and be invited by them
- [] Users can upload text documents and comment on them
- [] Users can assign multiple users to a task item, using the search feature instead of a dropdown

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
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
