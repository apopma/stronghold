Stronghold.Views.DiscussionIndexItem = Backbone.View.extend ({
  template: JST['discussions/item'],
  tagName: 'article',
  className: 'discussion col-md-12',
  // project: owning project
  // model: discussion
  // collection: discussion.comments()

  initialize: function (options) {
    this.project = options.project;

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync add remove", this.render);
  },

  render: function () {
    var content = this.template({
      project_id: this.project.id, discussion: this.model,
      numComments: this.collection.length, creator: this.model.creator()
    });
    this.$el.html(content);
    return this;
  }
});
