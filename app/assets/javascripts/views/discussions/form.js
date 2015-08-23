Stronghold.Views.DiscussionForm = Backbone.View.extend ({
  template: JST['discussions/form'],
  tagName: 'form',
  className: 'discussion-form',
  // project: owning project
  // model: new or existing discussion
  // collection: project.discussions()

  initialize: function(options) {
    this.project = options.project;
  },

  render: function () {
    var content = this.template({ project: this.project, discussion: this.model });
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
  }
});
