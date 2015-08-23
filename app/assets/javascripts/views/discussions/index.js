Stronghold.Views.DiscussionIndex = Backbone.CompositeView.extend ({
  template: JST['discussions/index'],
  className: 'discussion-index',
  // model: project
  // collection: project.discussions()

  initialize: function () {
    this.collection.each(function (discussion) {
      this.addDiscussionView(discussion);
    }.bind(this));

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addDiscussionView);
    this.listenTo(this.collection, "remove", this.removeDiscussionView);
  },

  events: {
    "click .new-discussion": "openDiscussionForm",

  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  // ---------------------------------------------------------------------------

  addDiscussionView: function(discussion) {
    var subview = new Stronghold.Views.DiscussionIndexItem({
      project: this.model,
      model: discussion,
      collection: discussion.comments()
    });
    this.addSubview(".discussions", subview);
  },

  removeDiscussionView: function(discussion) {
    this.removeModelSubview(".discussions", discussion);
  },

  // ---------------------------------------------------------------------------

  openDiscussionForm: function(event) {
    var form = new Stronghold.Views.DiscussionForm({
      model: new Stronghold.Models.Discussion(),
      project: this.model, collection: this.collection
    });
    this._newDiscussionBtn = this.$('.discussion-create').html();
    this.$('.discussion-create').empty();
    this.addSubview(".discussion-create", form);
  }
});
