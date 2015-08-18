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
    var content = this.template({ actionType: this.actionType });
    this.$el.html(content);
    return this;
  }
});
