Stronghold.Views.ChecklistIndexItem = Backbone.CompositeView.extend ({
  template: JST['checklists/index_item'],
  tagName: 'article',
  className: 'checklist-index-item col-md-12',
  // project: owning project
  // model: checklist
  // collection: checklist.tasks()
  // isShowView: true when routed to projects/:project_id/checklists/:id

  initialize: function (options) {
    this.project = options.project;
    this.isShowView = options.isShowView;

    this.collection.each(function (task) {
      this.addTaskView(task);
    }.bind(this));

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTaskView);
    this.listenTo(this.collection, "remove", this.removeTaskView);
  },

  events: {
    "click .new-task": "openTaskForm",
    "click .new-task-submit": "submitNewTask",
    "click .new-task-cancel": "cancelTaskForm",
    "click .delete-checklist": "deleteChecklist"
  },

  addTaskView: function (task) {
    var subSubview = new Stronghold.Views.ChecklistTaskItem({
      model: task, checklist: this.model,
      collection: task.assignedUsers(),
      project: this.project
    });
    this.addSubview('.tasks', subSubview);
  },

  removeTaskView: function (task) {
    this.removeModelSubview('.tasks', task);
  },

  openTaskForm: function (event) {
    var form = new Stronghold.Views.TaskForm({
      model: new Stronghold.Models.Task({ checklist_id: this.model_id }),
      collection: this.collection,
      project: this.project,
      viewType: "create"
    });

    this._newTaskBtn = this.$(".task-create").html();
    this.$(".task-create").html(form.render().$el);
  },

  cancelTaskForm: function (event) {
    event.preventDefault();
    this.$(".task-create").html(this._newTaskBtn);
  },

  submitNewTask: function(event) {
    event.preventDefault();
    var form = $(event.currentTarget).parent().parent();
    var formData = form.serializeJSON();
    delete formData.query;

    var newAssignments = this.$('.assignments').children().map(function (_, el) {
       return $(el).data("user-id");
     });

    var task = new Stronghold.Models.Task({
      checklist_id: this.model.id,
      assignees: $.makeArray(newAssignments) // Rails sees jQuery objs otherwise
     });

    task.save(formData, {
      success: function() {
        // update the task model client-side too
        var users = newAssignments.map(function (_, id) {
          return this.project.members().getOrFetch(id);
        }.bind(this));
        users.each(function (_, user) { task.assignedUsers().add(user); });

        this.collection.add(task);
        this.$('.task-create').html(this._newTaskBtn);
      }.bind(this),

      error: function(model, resp, opts) {
        debugger;
      }.bind(this)
    });
  },

  deleteChecklist: function (event) {
    event.preventDefault();
    var c = window.confirm("Really delete this checklist?");

    if (c) {
      this.model.destroy({
        success: function () {
          this.model.clear();
          Backbone.history.navigate("#projects/" + this.project.id, { trigger: true });
        }.bind(this)
      });
    }
  },

  render: function () {
    var index = this;
    var content = this.template({
      project: this.project,
      checklist: this.model,
      isShowView: this.isShowView
     });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
