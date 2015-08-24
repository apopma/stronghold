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
    var content = this.template({ task: this.model, viewType: this.viewType });
    this.$el.html(content);

    this.$(".datepicker").datepicker({ minDate: 0 });
    this.$('.typeahead').typeahead({
      minLength: 3,
      highlight: true
    },
    { // dataset options
      name: 'searched-users',
      limit: 10, // actually 5; bugfix mandates this being (2 * actual limit)
      display: function(obj) { return obj.username; },
      templates: { suggestion: JST["users/search_item"] },
      source: this.typeaheadSource.bind(this)
    });

    return this;
  },

  events: {
    "typeahead:select .typeahead": "addUserToAssignees",
    "click .remove-assignee": "removeUserFromAssignees"
  },

  typeaheadSource: function(query, syncResults, asyncResults) {
    $.ajax({
      url: "/api/users",
      data: { query: query, project_id: this.project.id },
      success: function(data, textStatus, jqXHR) {
        var filteredData = _.filter(data, function(user) {
          // Don't show users if they're already assigned.
          return !_.contains(this._usersToAssign, user.id);
        }.bind(this));

        return asyncResults(filteredData);
      }.bind(this)
    });
  },

  addUserToAssignees: function (event, item) {
    var userId = item.id;
    var user = this.project.members().get(userId);
    var newAssigneeEl = JST['tasks/assignee']({
      user: user, task: this.model
    });

    // if the list of users to assign doesn't already include this user, add it
    if ($.inArray(userId, this._usersToAssign) === -1) {
      this.$('.assignments').append(newAssigneeEl);
      this._usersToAssign.push(userId);
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
