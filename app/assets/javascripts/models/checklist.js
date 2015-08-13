Stronghold.Models.Checklist = Backbone.Model.extend ({
  urlRoot: "api/projects/:project_id/checklists",

  tasks: function() {
    if (!this._tasks) {
      this._tasks = new Stronghold.Collections.Tasks([], { checklist: this });
    }
    return this._tasks;
  },

  parse: function(response) {
    if (response.tasks) {
      this.tasks().set(response.tasks, { parse: true });
      delete response.tasks;
    }

    return response;
  }
});
