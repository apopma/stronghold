Stronghold.Views.ChecklistTaskItem = Backbone.View.extend ({
  template: JST['tasks/checklist_item'],
  tagName: 'li',
  className: 'task col-md-12',
  // model: task
  // collection: task.assignedUsers()

  events: {
    "click .task-toggle": "toggle"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add remove", this.render);
  },

  render: function () {
    var content = this.template({
      task: this.model, assignments: this.collection,
      isDone: this.model.get("done")
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
  }
});
