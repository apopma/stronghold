Stronghold.Views.TaskForm = Backbone.View.extend ({
  template: JST['tasks/form'],
  tagName: 'form',
  className: 'new-task-form',
  // model: new or existing Task,
  // collection: checklist's tasks from owning checklist
  // project: owning project

  initialize: function(options) {
    this.project = options.project;
    this._usersToAssign = [];
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    return this;
  },

  events: {
    "change .search": "searchMembers",
    "click .search-results li": "addUserToAssignees"
  },

  searchMembers: function(event) {
    var query = this.$('.search').val();
    $.ajax({
      url: ("api/projects/" + this.project.id + "/users"),
      data: { query: query },

      success: function(response) {
        this.$('.search-results').empty();

        response.forEach(function (searchResult) {
          var $assignment = $("<li>").html(searchResult.username);
          $assignment.attr("data-id", searchResult.id);
          this.$('.search-results').append($assignment);
        }.bind(this));
      }.bind(this)
    });
  },

  addUserToAssignees: function (event) {
    var userId = $(event.target).data("id");
    var user = this.project.members().get(userId);
    var newAssigneeEl = JST['tasks/assignee']({
      user: user, task: this.model
    });

    // if the list of users to assign doesn't already include this user, add it
    if ($.inArray(userId, this._usersToAssign) === -1) {
      this.$('.assignments').append(newAssigneeEl);
      this._usersToAssign.push(userId);
    }
  }
});
