Stronghold.Views.ChecklistIndexItem = Backbone.CompositeView.extend ({
  template: JST['checklists/index_item'],
  tagName: 'article',
  className: 'checklist-index-item col-md-12',
  // model: checklist
  // collection: checklist.tasks()

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTaskView);
    this.listenTo(this.collection, "remove", this.removeTaskView);
  },

  render: function () {
    var index = this;
    var content = this.template({ checklist: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
