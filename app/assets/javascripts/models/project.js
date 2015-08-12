Stronghold.Models.Project = Backbone.Model.extend({
  urlRoot: "api/projects",

  members: function() {
    if (!this._members) {
      // should the set property be model instead of project?
      this._members = new Stronghold.Collections.ProjectMembers([], { project: this });
    }

    return this._members;
  },

  parse: function(response) {
    if (response.members) {
      this.members().set(response.members);
      delete response.members;
    }

    return response;
  }
});
