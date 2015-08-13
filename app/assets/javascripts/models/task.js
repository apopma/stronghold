Stronghold.Models.Task = Backbone.Model.extend ({
  urlRoot: "api/tasks",
  initialize: function () {
    // body ...
  },

  assignedUsers: function() {
    if (!this._assignedUsers) {
      this._assignedUsers = new Stronghold.Collections.TaskAssignments([], { task: this });
    }
    return this._assignedUsers;
  },

  parse: function (response) {
      if (response.assigned_to) {
        this.assignedUsers().set(response.assigned_to);
        delete response.assigned_to;
      }

    return response;
  }
});
