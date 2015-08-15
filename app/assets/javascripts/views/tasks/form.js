Stronghold.Views.TaskForm = Backbone.View.extend ({
  template: JST['tasks/form'],
  tagName: 'form',
  className: 'new-task-form',

  initialize: function(options) {
    this.project = options.project;
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    return this;
  },

  events: {
    "change .search": "searchMembers"
  },

  searchMembers: function(event) {
    var val = this.$('.search').val();
    $.ajax({
      url: ("api/projects/" + this.project.id + "/users"),
      data: { query: val },

      success: function(response) {
        this.$('.search-results').empty();

        response.forEach(function (searchResult) {
          var $assignment = $("<li>").html(searchResult.username);
          $assignment.attr("data-id", searchResult.id);
          this.$('.search-results').append($assignment);
        }.bind(this))
      }.bind(this)
    });
  }
});
