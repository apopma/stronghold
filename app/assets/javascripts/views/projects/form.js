Stronghold.Views.ProjectForm = Backbone.View.extend ({
  template: JST['projects/form'],
  tagName: 'form',
  className: 'project-form',

  initialize: function () {

  },

  events: {
    "submit": "createNewProject",
    "change:project[invitees][]": "addInviteeField"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  addInviteeField: function (model, value) {
    console.log("invitees changed!");
  },

  createNewProject: function(event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON().project;

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
