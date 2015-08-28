Stronghold.Views.ProjectIndexItem = Backbone.View.extend ({
  template: JST['projects/index_item'],
  tagName: "article",
  className: "col-md-4 project-index-item",

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.members(), "sync add remove", this.render);
  },

  render: function () {
    var content = this.template({
      project: this.model,
      members: this.model.members().first(4),
      numMembers: this.model.members().length
     });
    this.$el.html(content);
    return this;
  }
});
