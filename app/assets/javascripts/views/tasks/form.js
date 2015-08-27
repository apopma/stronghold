Stronghold.Views.TaskForm = Backbone.View.extend ({
  template: JST['tasks/form'],
  tagName: 'form',
  className: 'new-task-form',
  // model: new or existing Task,
  // collection: checklist's tasks from owning checklist
  // project: owning project

  initialize: function(options) {
    this.project = options.project;
    this.viewType = options.viewType;
    this._usersToAssign = [];
    if (this.model.assignedUsers()) { this.prepopulateAssigneeList(); }
  },

  render: function () {
    var content = this.template({
      task: this.model,
      members: this.project.members(),
      viewType: this.viewType });
    this.$el.html(content);

    this.$(".datepicker").datepicker({ minDate: 0 });
    return this;
  },

  events: {
    "change .members-list": "addUserToAssignees",
    "click .remove-assignee": "removeUserFromAssignees"
  },

  addUserToAssignees: function (event) {
    if (event.target.value === "") { return; } // ignore the placeholder

    var user = this.project.members().findWhere({
      username: event.target.value
    });

    var newAssigneeEl = JST['tasks/assignee']({
      user: user, task: this.model
    });

    // if the list of users to assign doesn't already include this user, add it
    if ($.inArray(user.id, this._usersToAssign) === -1) {
      this.$('.assignment-elements').append(newAssigneeEl);
      this._usersToAssign.push(user.id);
    }
  },

  removeUserFromAssignees: function (event) {
    var user = $(event.currentTarget).parent();
    var idx = this._usersToAssign.indexOf(user.data("user-id"));
    this._usersToAssign.splice(idx, 1);
    user.remove();
  },

  prepopulateAssigneeList: function () {
    this.model.assignedUsers().each(function (user) {
      this._usersToAssign.push(user.id);
    }.bind(this));
  }
});
