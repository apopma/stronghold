Stronghold.Views.CommentShow = Backbone.View.extend ({
  // project: owning project,
  // model: comment,
  // commentable: parent's model (discussion, checklist, or task)
  // commentableType: commentable's model name

  template: JST['comments/show'],
  tagName: 'article',
  className: 'comment col-md-12',

  initialize: function (options) {
    this.project = options.project;
    this.commentable = options.commentable;
    this.commentableType = options.commentableType;

    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    debugger
    var content = this.template({
      project: this.project,
      comment: this.model,
      commenter: this.model.commenter()
    });
    this.$el.html(content);
    return this;
  },

  events: {
    "click .comment-edit": "openCommentForm",
    "click .comment-form-cancel": "closeCommentForm",
    "click .comment-delete": "deleteComment"
  },

  // ---------------------------------------------------------------------------

  openCommentForm: function (event) {
    var form = new Stronghold.Views.CommentForm({
      parentView: this,
      model: this.model,
      actionType: "update"
    });

    this.$el.html(form.render().$el); // zombie view problems with this?
  },

  closeCommentForm: function (event) {
    event.preventDefault();
    this.render();
  },

  // ---------------------------------------------------------------------------

  deleteComment: function(event) {
    event.preventDefault();
    var c = window.confirm("Really delete this comment?");

    if (c) {
      this.model.destroy({
        success: function() {
          this.model.clear();
        }.bind(this)
      });
    }
  }
});
