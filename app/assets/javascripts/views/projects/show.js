Stronghold.Views.ProjectShow = Backbone.CompositeView.extend ({
  template: JST['projects/show'],
  className: 'project-show',
  // model has collections: checklists, discussions, files

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var index = this;
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
