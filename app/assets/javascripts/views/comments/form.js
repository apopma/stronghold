Stronghold.Views.CommentForm = Backbone.View.extend ({
  template: JST['comments/form'],
  tagName: 'form',
  className: 'comment-form',
  // project: owning project
  // model: commentable (discussion, checklist, or task)
  // collection: commentable.comments()
  // commentableType: commentable's model name
  // actionType: either 'create' or 'update'

  initialize: function (options) {
    this.commentableType = options.commentableType;
    this.actionType = options.actionType;
  },

  render: function () {
    var content = this.template({
      comment: this.model,
      actionType: this.actionType
    });
    this.$el.html(content);
    return this;
  },

  events: {
    "click .new-comment-submit": "createComment"
  },

  // ---------------------------------------------------------------------------

  createComment: function (event) {
    var form = $(event.currentTarget).parent();
    var formData = form.find(".form-content").html();

    this.model.set("body", formData);
    this.model.set("commentable_id", this.model.id);
    this.model.set("commentable_type", this.commentableType);

    this.model.save({}, {
      success: function() {
        this.collection.add(this.model);
      }.bind(this),

      error: function(model, resp, opts) {
        debugger;
      }.bind(this)
    });

    this.remove();
  }
});
