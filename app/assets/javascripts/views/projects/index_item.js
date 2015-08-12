Stronghold.Views.ProjectIndexItem = Backbone.View.extend ({
  template: JST['projects/index_item'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ project: this.model, members: this.model.members() });
  }
});
