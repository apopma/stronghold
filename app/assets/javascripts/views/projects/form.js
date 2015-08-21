  //TODO: add fuzzy-search for all users when searching for new invitees
  //TODO: prevent form submission with invalid input

Stronghold.Views.ProjectForm = Backbone.View.extend ({
  template: JST['projects/form'],
  className: 'project-form',

  events: {
    "click .proj-submit": "createNewProject",
    "change .invitees :last-child": "addInviteeField"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    $('.typeahead').typeahead({
      minLength: 3,
      highlight: true
    },
    {
      name: 'searched-users',
      source: this.typeaheadSource
    });
    return this;
  },

  addInviteeField: function (event) {
    // $(event.target).prop("disabled", true);
    // var $newInputField = this.newInputField();
    // this.$('.invitees').append($newInputField);
  },

  typeaheadSource: function(query, syncResults, asyncResults) {
    $.ajax({
      
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
