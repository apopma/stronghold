Stronghold.Collections.ProjectMemberships = Backbone.Collection.extend ({
  initialize: function (models, options) {
    this.project = options.project;
  },

  model: Stronghold.Models.ProjectMembership,
  url: function() {
    return "api/projects/" + this.project.id + "/project_memberships";
  }
});
