Stronghold.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],
  className: 'projects-index',

  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
