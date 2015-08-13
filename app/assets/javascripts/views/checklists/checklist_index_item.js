Stronghold.Views.ChecklistIndexItem = Backbone.CompositeView.extend ({
  template: JST['checklists/index_item'],
  tagName: 'article',
  className: 'checklist-index-item col-md-12',
  // model: checklist
  // collection: checklist.tasks()

  initialize: function () {
    this.collection.each(function (task) {
      this.addTaskView(task);
    }.bind(this));

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTaskView);
    this.listenTo(this.collection, "remove", this.removeTaskView);
  },

  addTaskView: function (task) {
    var subSubview = new Stronghold.Views.ChecklistTaskItem({
      model: task,
      collection: task.assignedUsers()
    });
    this.addSubview('.tasks', subSubview);
  },

  removeTaskView: function (task) {
    this.removeModelSubview('.tasks', task);
  },

  render: function () {
    var index = this;
    var content = this.template({ checklist: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
