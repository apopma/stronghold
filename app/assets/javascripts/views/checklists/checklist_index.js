Stronghold.Views.ChecklistIndex = Backbone.CompositeView.extend ({
  template: JST['checklists/index'],
  className: 'checklist-index',
  // model: project
  // collection: project.checklists()

  initialize: function () {
    this.collection.each(function (checklist) {
      this.addChecklistView(checklist);
    }.bind(this));

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addChecklistView);
    this.listenTo(this.collection, "remove", this.removeChecklistView);
  },

  addChecklistView: function(checklist) {
    var subview = new Stronghold.Views.ChecklistIndexItem({
      model: checklist,
      collection: checklist.tasks()
    });
    this.addSubview(".checklists", subview);
  },

  removeChecklistView: function(checklist) {
    this.removeModelSubview('.checklists', checklist);
  },

  render: function () {
    var index = this;
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
