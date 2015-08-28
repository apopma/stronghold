Stronghold.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  // model: User
  // collection: user.assignedTasks()

  initialize: function(options) {
    this.collection.each(function (task) {
      this.addTaskView(task);
    });

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTaskView);
    this.listenTo(this.collection, "remove", this.removeTaskView);
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addTaskView: function (task) {
    var item = new Stronghold.Views.TaskItem({
      model: task, checklist: task.checklist(),
      collection: task.assignedUsers(),
      project: task.project(),
    });
    this.addSubview('.user-tasks', item);
  },

  removeTaskView: function (task) {
    this.removeModelSubview('.user-tasks', task);
  },
});
