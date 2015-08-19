Stronghold.Views.TaskItem = Backbone.View.extend ({
  template: JST['tasks/item'],
  tagName: 'li',
  className: 'task col-md-7',

  initialize: function (options) {
    this.project = options.project;
    this.checklist = options.checklist;
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.collection, "add remove", this.render);
    // project: owning project, through owning checklist
    // model: task
    // collection: task.assignedUsers()
  },

  events: {
    "click .task-toggle": "toggle",
    "mouseenter": "displayOptionButtons",
    "mouseleave": "removeOptionButtons",
    "click .delete-task": 'delete',
    "click .edit-task": "openEditForm",
    "click .new-task-cancel": "closeEditForm",
    "click .task-update": "update"
  },

  render: function () {
    var content = this.template({
      task: this.model, assignments: this.collection,
      project: this.project, checklist: this.checklist,
      isDone: this.model.get('done')
    });
    this.$el.html(content);
    return this;
  },

  // ---------------------------------------------------------------------------

  displayOptionButtons: function (event) {
    this._optionBtns = new Stronghold.Views.TaskOptions({ model: this.model });
    this.$('.task-options').append(this._optionBtns.render().$el);
  },

  removeOptionButtons: function (event) {
    this._optionBtns.remove();
  },

  // ---------------------------------------------------------------------------

  toggle: function (event) {
    var newDoneState = $(event.currentTarget).prop("checked");
    var task = $(event.currentTarget).parent();

    this.model.save({ done: newDoneState }, {
      success: function() {
        newDoneState ? task.addClass('done') : task.removeClass('done');
      }.bind(this),

      error: function (model, resp, opts) {
        debugger;
      }.bind(this)
    });
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

  update: function (event) {
    // basically submitNewTask from ChecklistShow, without a new Task model
    event.preventDefault();
    var formData = $(event.currentTarget).parent().parent().serializeJSON();
    delete formData.query;

    var newAssignments = this.$('.assignments').children().map(function (_, el) {
       return $(el).data("user-id");
     });
     if (newAssignments.length < 1) {
       // if the user has removed all existing assignments, destroy them server-side
       this.model.set("destroy_assignees", true);
     }

     this.model.set("assignees", $.makeArray(newAssignments));
     this.model.save(formData, {
       error: function () {
         debugger;
       }.bind(this)
     });
  },

  // ---------------------------------------------------------------------------

  openEditForm: function (event) {
    var view = new Stronghold.Views.TaskForm({
      model: this.model, project: this.project, viewType: "update"
    });
    this.$el.html(view.render().$el);
  },

  closeEditForm: function (event) {
    event.preventDefault();
    this.render();
  }
});
