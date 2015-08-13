Stronghold.Views.ChecklistTaskItem = Backbone.View.extend ({
  template: JST['tasks/checklist_item'],
  tagName: 'li',
  className: 'task',
  // model: task
  // collection: task.assignedUsers()

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add remove", this.render);
  },

  render: function () {
    var content = this.template({
      task: this.model, assignments: this.collection,
      isDone: this.model.get("done");
    });
    this.$el.html(content);
    return this;
  }
});
