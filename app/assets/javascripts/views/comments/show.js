Stronghold.Views.CommentShow = Backbone.View.extend ({
  template: JST['comments/show'],
  tagName: 'article',
  className: 'comment col-md-12',
  // project: owning project,
  // model: comment,
  // commentable: parent's model (discussion, checklist, or task)
  // commentableType: commentable's model name

  initialize: function (options) {
    this.project = options.project;
    this.commentable = options.commentable;
    this.commentableType = options.commentableType;

    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      project: this.project,
      comment: this.model, commenter: this.model.commenter()
    });
    this.$el.html(content);
    return this;
  }
});
