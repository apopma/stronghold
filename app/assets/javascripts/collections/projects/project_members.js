Stronghold.Collections.ProjectMembers = Backbone.Collection.extend ({
  model: Stronghold.Models.User,
  url: "api/users",

  initialize: function () {
    // body ...
  }
});
