Stronghold.Views.TaskShow = Backbone.CompositeView.extend ({
  // project: owning project, through owning checklist
  // model: task
  // collection: task.assignedUsers()

  template: JST['tasks/show'],
  className: 'task',

  initialize: function (options) {
    this.project = options.project;
    this.checklist = options.checklist;

    this.model.comments().each(function (comment) {
      this.addCommentView(comment);
    }.bind(this));

    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.collection, "add remove", this.render);

    this.listenTo(this.model.comments(), "add", this.addCommentView);
    this.listenTo(this.model.comments(), "remove", this.removeCommentView);
  },

  events: {
    "click .task-toggle": "toggle",
    "click .task-update": "update",
    "click .delete-task": "delete",

    "mouseenter .task-show": "displayOptionButtons",
    "mouseleave .task-show": "removeOptionButtons",

    "click .edit-task": "openEditForm",
    "click .new-task-cancel": "closeEditForm",

    "click .new-comment": "openCommentForm",
    "click .comment-form-cancel": "closeCommentForm"
  },

  render: function () {
    var content = this.template({
      task: this.model, assignments: this.collection,
      project: this.project, checklist: this.checklist,
      isDone: this.model.get('done'),
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  // ---------------------------------------------------------------------------

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

  update: function (event) {
    // basically submitNewTask from ChecklistShow, without a new Task model
    event.preventDefault();
    var formData = this.$('.new-task-form').serializeJSON();
    delete formData.query;

    var newAssignments = this.$('.assignment-elements').children().map(function (_, el) {
       return $(el).data("user-id");
     });
     if (newAssignments.length < 1) {
       // if the user has removed all existing assignments, destroy them server-side
       this.model.set("destroy_assignees", true);
     }

     this.model.set("assignees", $.makeArray(newAssignments));
     this.model.save(formData, {});
  },

  delete: function (event) {
    // TODO: make the user doubleclick or click two buttons instead
    var c = window.confirm("Really delete this task?");

    if (c) {
      this.model.destroy({
        success: function() {
          this.model.clear();
          Backbone.history.navigate(
            "#projects/" + this.project.id + "/checklists/" + this.checklist.id,
            { trigger: true }
          );
        }.bind(this)
      });
    }
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

  addCommentView: function (comment) {
    var commentView = new Stronghold.Views.CommentShow({
      project: this.project,
      model: comment,
      commentable: this.model,
      commentableType: "Task"
    });
    this.addSubview('.comments', commentView);
  },

  removeCommentView: function (comment) {
    this.removeModelSubview('.comments', comment);
  },

  // ---------------------------------------------------------------------------

  openEditForm: function (event) {
    this.editView = new Stronghold.Views.TaskForm({
      model: this.model, project: this.project, viewType: "update"
    });
    this.$(".task-show").html(this.editView.render().$el);
  },

  closeEditForm: function (event) {
    event.preventDefault();
    this.editView.remove();
    delete this.editView;
    this.render();
  },

  // ---------------------------------------------------------------------------

  openCommentForm: function (event) {
    this._commentBtn = this.$('.comment-create').html();
    this.$('.comment-create').empty();

    var form = new Stronghold.Views.CommentForm({
      parentView: this,
      commentable: this.model,
      commentableType: "Task",
      actionType: "create",
      model: new Stronghold.Models.Comment({ commentable_id: this.model.id })
    });
    this._commentForm = form;

    this.addSubview('.comment-create', form);
  },

  closeCommentForm: function (event) {
    event.preventDefault();
    this.removeSubview('.comment-form', this._commentForm);
    this.$('.comment-create').html(this._commentBtn);
  }
});
