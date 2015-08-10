# Phase 4: Comments

## Rails
### Models
Comment, Discussion

### Controllers
Api::CommentsController(new, create, edit, update, destroy)
DiscussionsController(index, show)
Api::DiscussionsController (new, create, edit, update, destroy)

### Views
/projects/:id/discussions/index.html.erb
/projects/:id/discussions/:discussion_id/show.html.erb

## Backbone
### Models
Discussion, Comment

### Collections
Discussions, Comments

### Views
DiscussionForm
DiscussionShow
DiscussionIndexItem
CommentsShow (composite subview to appear on the show pages of anything commentable: checklists, tasks, discussions, files; will contain Comment subviews)
Comment (subview for CommentsShow)
CommentForm


## Gems/Libraries
Voog/wysihtml
Font Awesome
