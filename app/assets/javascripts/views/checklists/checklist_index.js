Stronghold.Views.ChecklistIndex = Backbone.CompositeView.extend ({
  template: JST['checklists/index'],
  className: 'checklist-index',

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync add remove", this.render);
  },

  render: function () {
    var index = this;
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
