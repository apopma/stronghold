Stronghold.Models.Task = Backbone.Model.extend ({
  urlRoot: "api/tasks",

  comments: function() {
    if (!this._comments) {
      this._comments = new Stronghold.Collections.Comments([], { task: this });
    }
    return this._comments;
  },

  assignedUsers: function() {
    if (!this._assignedUsers) {
      this._assignedUsers = new Stronghold.Collections.Users([], { task: this });
    }
    return this._assignedUsers;
  },

  parse: function (response) {
      if (response.assigned_to) {
        this.assignedUsers().set(response.assigned_to);
        delete response.assigned_to;
      }

      if (response.comments) {
        this.comments().set(response.comments);
        delete response.comments;
      }

    return response;
  }
});
