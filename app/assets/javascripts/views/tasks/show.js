Stronghold.Views.ChecklistTaskItem = Backbone.View.extend ({
  template: JST['tasks/checklist_item'],
  tagName: 'li',
  className: function() { // for to style the view nicely
    var classes = 'task col-md-7';
    return this.model.get('done') ? classes + " done" : classes;
  },
  // project: owning project, through owning checklist
  // model: task
  // collection: task.assignedUsers()

  events: {
    "click .task-toggle": "toggle",
    "mouseenter": "displayOptionButtons",
    "mouseleave": "removeOptionButtons",
    "click .delete-task": 'delete',
    "click .edit-task": "openEditForm",
    "click .new-task-cancel": "closeEditForm"
  },

  initialize: function (options) {
    this.project = options.project;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add remove", this.render);
  },

  render: function () {
    var content = this.template({
      task: this.model, assignments: this.collection,
      isDone: this.model.get('done')
    });
    this.$el.html(content);
    return this;
  },

  toggle: function (event) {
    var newDoneState = $(event.currentTarget).prop("checked");
    var task = $(event.currentTarget).parent();

    this.model.save({ done: newDoneState }, {
      success: function() {
        if (newDoneState) {
          task.addClass('done');
        } else {
          task.removeClass('done');
        }
      }.bind(this),

      error: function (model, resp, opts) {
        debugger;
      }.bind(this)
    });
  },

  displayOptionButtons: function (event) {
    var view = new Stronghold.Views.TaskOptions({ model: this.model });
    this.$('.task-options').append(view.render().$el);
  },

  removeOptionButtons: function (event) {
    // TODO: this creates zombie views; fix it soonest
    this.$('.task-options').empty();
  },

  delete: function (event) {
    // TODO: make the user doubleclick or click two buttons instead
    var c = window.confirm("Really delete this task?");

    if (c) {
      this.model.destroy({
        success: function() {
          this.model.clear();
        }.bind(this)
      });
    }
  },

  openEditForm: function (event) {
    var view = new Stronghold.Views.TaskForm({
      model: this.model, project: this.project
    });
    this.$el.html(view.render().$el);
  },

  closeEditForm: function (event) {
    event.preventDefault();
    this.render();
  }
});
