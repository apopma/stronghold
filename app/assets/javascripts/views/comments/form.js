Stronghold.Views.CommentForm = Backbone.View.extend ({
  // model: comment, new or existing

  // commentable: instantiating view's model, must have a comments property
  // commentable_id is either set on view instantiation, or exists already
  // commentableType: commentable's model name
  // actionType: either 'create' or 'update'

  // parentView: view which instantiated the comment form
  //  this is passed in order to close the form after create/update
  //  parent view must have a closeCommentForm(event) method

  template: JST['comments/form'],
  tagName: 'form',
  className: 'comment-form',

  initialize: function (options) {
    this.commentable = options.commentable;
    this.commentableType = options.commentableType;
    this.actionType = options.actionType;
    this.parentView = options.parentView;
  },

  render: function () {
    var content = this.template({
      comment: this.model,
      actionType: this.actionType
    });
    this.$el.html(content);

    this.$('.wysihtml5').wysihtml5({
      toolbar: {
        "fa": true,
        "image": false,
        "link": false,
        "blockquote": false
      }
    });
    return this;
  },

  events: {
    "click .new-comment-submit": "createComment",
    "click .edit-comment-submit": "updateComment"
  },

  // ---------------------------------------------------------------------------

  createComment: function (event) {
    var form = $(event.currentTarget).parent();
    var formData = form.find(".form-content").html();

    this.model.set("body", formData);
    this.model.set("commentable_type", this.commentableType);

    this.model.save({}, {
      success: function() {
        this.commentable.comments().add(this.model);
      }.bind(this),

      error: function(model, resp, opts) {
        debugger;
      }.bind(this)
    });

    this.parentView.closeCommentForm(event);
  },

  updateComment: function (event) {
    var form = $(event.currentTarget).parent();
    var formData = form.find(".form-content").html();

    this.model.save({ body: formData }, {
      success: function() {
        this.model.set("body", formData);
      }.bind(this),

      error: function() {
        debugger;
      }
    });

    this.parentView.closeCommentForm(event);
  }
});
