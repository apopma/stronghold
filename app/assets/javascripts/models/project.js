Stronghold.Models.Project = Backbone.Model.extend({
  urlRoot: "api/projects",

  members: function() {
    if (!this._members) {
      this._members = new Stronghold.Collections.ProjectMembers([], { project: this });
    }

    return this._members;
  },

  memberships: function() {
    if (!this._memberships) {
      this._memberships = new Stronghold.Collections.ProjectMemberships([], { project: this });
    }
    return this._memberships;
  },

  checklists: function() {
    if (!this._checklists) {
      this._checklists = new Stronghold.Collections.Checklists([], { project: this });
    }

    return this._checklists;
  },

  tasks: function() {
    if (!this._tasks) {
      this._tasks = new Stronghold.Collections.Tasks([], { project: this });
    }

    return this._tasks;
  },

  discussions: function() {
    if (!this._discussions) {
      this._discussions = new Stronghold.Collections.Discussions([], { project: this });
    }

    return this._discussions;
  },

  parse: function(response) {
    if (response.members) {
      this.members().set(response.members);
      delete response.members;
    }

    if (response.memberships) {
      this.memberships().set(response.memberships);
      delete response.memberships;
    }

    if (response.checklists) {
      this.checklists().set(response.checklists, { parse: true });
      delete response.checklists;
    }

    if (response.tasks) {
      this.tasks().set(response.tasks, { parse: true });
      delete response.tasks;
    }

    if (response.discussions) {
      this.discussions().set(response.discussions, { parse: true });
      delete response.discussions;
    }

    return response;
  }
});
