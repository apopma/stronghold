Stronghold.Views.DiscussionShow = Backbone.CompositeView.extend ({
  template: JST['discussions/show'],
  tagName: 'section',
  className: 'discussion-show',
  // project: owning project
  // model: discussion
  // collection: discussion.comments()

  initialize: function (options) {
    this.project = options.project;
    this.collection.each(function (comment) {
      this.addCommentView(comment);
    }.bind(this));

    this._discussionInfo = new Stronghold.Views.DiscussionInfo({ model: this.model });
    this.addSubview(".discussion-info", this._discussionInfo);

    this.listenTo(this.model, "sync change", this.render);
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
    "click .new-comment": "openCommentForm",
    "click .comment-form-cancel": "closeCommentForm",
    "dblclick .info-editable": "openDiscussionForm",
    "click .delete-discussion": "delete"
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
      parentView: this,
      commentable: this.model,
      commentableType: "Discussion",
      actionType: "create",
      model: new Stronghold.Models.Comment({ commentable_id: this.model.id })
    });
    this._commentForm = form;

    this.addSubview('.comment-create', form);
  },

  closeCommentForm: function (event) {
    event.preventDefault();
    this.removeSubview('.comment-form', this._commentForm);
    this.$('.comment-create').html(this._commentBtn);
  },

  // ---------------------------------------------------------------------------

  openDiscussionForm: function (event) {
    if ((this.model.creator().id != Stronghold.CURRENT_USER.id)) {
      // Only the discussion's creator can edit its body.
      return false;
    }

    this._discussionForm = new Stronghold.Views.DiscussionForm({
      model: this.model,
      project: this.project,
      removeFromParentView: this.removeDiscussionForm.bind(this),
      actionType: "update"
    });

    this.removeSubview(".discussion-info", this._discussionInfo);
    this.addSubview(".discussion-info", this._discussionForm);
  },

  removeDiscussionForm: function () {
    // something about composite view just does not play nice with non-view html
    // every other attempt to reinsert the model's info into the DOM failed
    // so now it's a subview inserted on initialize and removed/readded here
    this.removeSubview(".discussion-info", this._discussionForm);
    this.addSubview(".discussion-info", this._discussionInfo);
  },

  // ---------------------------------------------------------------------------

  delete: function(event) {
    event.preventDefault();
    var c = window.confirm("Really delete this discussion?");

    if (c) {
      this.model.destroy({
        success: function() {
          this.model.clear();
          Backbone.history.navigate("#projects/" + this.project.id + "/discussions",
          { trigger: true });
        }.bind(this)
      });
    }
  }
});
