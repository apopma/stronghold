Stronghold.Views.ChecklistIndexItem = Backbone.CompositeView.extend ({
  template: JST['checklists/index_item'],
  tagName: 'article',
  className: 'checklist-index-item col-md-12',
  // project: owning project
  // model: checklist
  // collection: checklist.tasks()

  initialize: function (options) {
    this.collection.each(function (task) {
      this.addTaskView(task);
    }.bind(this));

    this.project = options.project;
    this.isShowView = options.isShowView;

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTaskView);
    this.listenTo(this.collection, "remove", this.removeTaskView);
  },

  events: {
    "click .new-task": "openTaskForm",
    "click .new-task-submit": "submitNewTask",
    "click .new-task-cancel": "cancelTaskForm"
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

  openTaskForm: function (event) {
    var form = JST['tasks/form']({ checklist: this.model });
    this._newTaskBtn = this.$(".task-create").html();
    this.$(".task-create").html(form);
  },

  cancelTaskForm: function (event) {
    event.preventDefault();
    this.$(".task-create").html(this._newTaskBtn);
  },

  submitNewTask: function(event) {
    event.preventDefault();
    var form = $(event.currentTarget).parent();
    var formData = form.serializeJSON();

    var task = new Stronghold.Models.Task({ checklist_id: this.model.id });
    task.save(formData, {
      success: function() {
        this.collection.add(task);
        this.$('task-create').html(this._newTaskBtn);
      }.bind(this),

      error: function(model, resp, opts) {
        debugger;
      }.bind(this)
    });
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
