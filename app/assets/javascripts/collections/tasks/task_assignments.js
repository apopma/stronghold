Stronghold.Collections.TaskAssignments = Backbone.Collection.extend ({
  model: Stronghold.Models.User,
  url: "api/task_assignments",

  initialize: function () {
    // body ...
  }
});
