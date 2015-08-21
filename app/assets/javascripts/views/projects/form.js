  //TODO: add fuzzy-search for all users when searching for new invitees
  //TODO: prevent form submission with invalid input

Stronghold.Views.ProjectForm = Backbone.CompositeView.extend ({
  template: JST['projects/form'],
  className: 'project-form',

  events: {
    "click .proj-submit": "createNewProject",
    "click .tt-suggestion": "addInviteeField"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    this.$('.typeahead').typeahead({
      minLength: 3,
      highlight: true
    },
    {
      name: 'searched-users',
      templates: {
        suggestion: JST["users/search_item"]
      },
      source: this.typeaheadSource
    });

    return this;
  },

  addInviteeField: function (event) {
    var item = $(event.currentTarget);
    var id = item.data("id");
    var username = item.data("username");
    var view = new Stronghold.Views.Invitee({ userid: id, username: username });
    this.$('.search-bar .tt-input').val(""); // clear out the JSON
    this.addSubview(".invitees", view);
  },

  typeaheadSource: function(query, syncResults, asyncResults) {
    $.ajax({
      url: "/api/users",
      data: { query: query },
      success: function(data, textStatus, jqXHR) {
        return asyncResults(data.map(function (attrs) {
          return attrs;
        }));
      }
    });
  },

  createNewProject: function(event) {
    event.preventDefault();
    this.$("input").prop("disabled", false);

    var formData = this.$(".project-form").serializeJSON().project;
    var newProject = new Stronghold.Models.Project();

    newProject.set(formData);
    newProject.save({}, {
      success: function() {
        this.collection.add(newProject);
        Backbone.history.navigate("projects/" + newProject.id, { trigger: true });
      }.bind(this),

      error: function(model, resp, opts) {
        debugger;
      }
    });
  }
});
