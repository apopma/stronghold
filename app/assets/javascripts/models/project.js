Stronghold.Models.Project = Backbone.Model.extend({
  urlRoot: "api/projects",

  members: function() {
    if (!this._members) {
      // should the set property be model instead of project?
      this._members = new Stronghold.Collections.ProjectMembers([], { project: this });
    }

    return this._members;
  },

  checklists: function() {
    if (!this._checklists) {
      this._checklists = new Stronghold.Collections.Checklists([], { project: this });
    }

    return this._checklists;
  },

  parse: function(response) {
    if (response.members) {
      this.members().set(response.members);
      delete response.members;
    }

    if (response.checklists) {
      this.checklists().set(response.checklists);
      delete response.checklists;
    }

    return response;
  }
});
