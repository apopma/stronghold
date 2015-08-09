# Phase 6: File Uploads with Labels

## Rails
### Models
Label, Labeling, File(?)

### Controllers
FilesController (index)
Api::FilesController (show, destroy)
LabelsController (show)
Api::LabelsController (new, show, edit, update, destroy)

### Views
projects/:id/files/index.html.erb
projects/:id/files/:file_id/show.html.erb
projects/:id/labels/:label_id/show.html.erb

## Backbone
### Models
Label, Labeling, File(?)

### Collections
Labels, Labelings, Files(?)

### Views
FilesIndex (composite view housing FilesIndexItems)
ProjectFileIndex (composite view for ProjectIndex housing FilesIndexItems)
LabelIndex (composite view housing FilesIndexItems)

NewLabelForm (subview to be inserted into FilesIndexItem or ProjectFileItem)
UploadForm (composite subview to be inserted into CommentForm, TaskForm, or ProjectIndex; contains UploadItem subviews)

FilesIndexItem (subview for FilesIndex, ProjectFilesIndex, and LabelIndex)
UploadItem (subview for UploadForm)

## Gems/Libraries
Several possible:
- Cloudinary
- Paperclip
- Filepicker
- Others?
