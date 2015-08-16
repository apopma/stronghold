Stronghold.Views.ChecklistTaskItem = Backbone.View.extend ({
  template: JST['tasks/checklist_item'],
  tagName: 'li',
  className: function() { // for to style the view nicely
    var classes = 'task col-md-12';
    return this.model.get('done') ? classes + " done" : classes;
  },
  // model: task
  // collection: task.assignedUsers()

  events: {
    "click .task-toggle": "toggle",
    "mouseenter": "displayOptionButtons",
    "mouseleave": "removeOptionButtons"
  },

  initialize: function () {
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
    // TODO: ask about zombie views on these
    this.$('.task-options').html(null);
  }
});
