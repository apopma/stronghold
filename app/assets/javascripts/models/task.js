Stronghold.Models.Task = Backbone.Model.extend ({
  urlRoot: "api/tasks",

  project: function() {
    if (!this._project) {
      this._project = new Stronghold.Models.Project([], { task: this });
    }
    return this._project;
  },

  checklist: function() {
    if (!this._checklist) {
      this._checklist = new Stronghold.Models.Checklist([], { task: this });
    }
    return this._checklist;
  },

  creator: function() {
    if (!this._creator) {
      this._creator = new Stronghold.Models.User([], { task: this });
    }
    return this._creator;
  },

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
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    if (response.creator) {
      this.creator().set(response.creator);
      delete response.creator;
    }

    if (response.project) {
      this.project().set(response.project);
      delete response.project;
    }

    return response;
  }
});
