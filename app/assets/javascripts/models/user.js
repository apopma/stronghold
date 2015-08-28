Stronghold.Models.User = Backbone.Model.extend ({
  urlRoot: "api/users",

  assignedTasks: function () {
    if (!this._assignedTasks) {
      this._assignedTasks = new Stronghold.Collections.Tasks();
    }

    return this._assignedTasks;
  },

  parse: function (response) {
    if (response.assigned_tasks) {
      this.assignedTasks().set(response.assigned_tasks, { parse: true });
      delete response.tasks;
    }

    return response;
  }
});
