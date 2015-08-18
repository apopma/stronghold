Stronghold.Views.DiscussionShow = Backbone.CompositeView.extend ({
  template: JST['discussions/show'],
  tagName: 'section',
  className: 'row discussion-show',
  // project: owning project
  // model: discussion
  // collection: discussion.comments()

  initialize: function (options) {
    this.project = options.project;
    this.collection.each(function (comment) {
      this.addCommentView(comment);
    }.bind(this));

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addCommentView);
    this.listenTo(this.collection, "remove", this.removeCommentView);
  },

  render: function () {
    var content = this.template({
      project: this.project, discussion: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  events: {
    "click .new-comment": "openCommentForm"
  },

  // ---------------------------------------------------------------------------

  addCommentView: function (comment) {
    var commentView = new Stronghold.Views.CommentShow({
      project: this.project, model: comment,
      commentable: this.model,
      commentableType: "Discussion"
    });
    this.addSubview('.comments', commentView);
  },

  removeCommentView: function (comment) {
    this.removeModelSubview('.comments', comment);
  },

  // ---------------------------------------------------------------------------

  openCommentForm: function (event) {
    this._commentBtn = this.$('.comment-create').html();
    this.$('.comment-create').empty();

    var form = new Stronghold.Views.CommentForm({
      commentableType: "Discussion", actionType: "create",
      model: new Stronghold.Models.Comment({ commentable_id: this.model.id })
    });

    this.addSubview('.comment-create', form);
  }
});
