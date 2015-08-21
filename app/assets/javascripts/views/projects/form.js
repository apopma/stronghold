Stronghold.Views.ProjectForm = Backbone.View.extend ({
  template: JST['projects/form'],
  tagName: 'div',
  className: 'project-form',

  initialize: function () {

  },

  events: {
    "submit": "createNewProject",
    "change .invitees :last-child": "addInviteeField",
    "click .remove-invitee": "removeInviteeField"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  addInviteeField: function (event) {
    $(event.target).prop("disabled", true);
    var $newInputField = this.newInputField();
    this.$('.invitees').append($newInputField);
  },

  removeInviteeField: function (event) {
    event.preventDefault();
  },

  newInputField: function() {
    // TODO: make this not be terrible
    return '<div class="invitee-field"> <input type="text" name="project[invitees][]"> <button class="remove-invitee">&times;</button> </div>';
  },

  createNewProject: function(event) {
    event.preventDefault();
    this.$("input").prop("disabled", false);
    var formData = this.$el.serializeJSON();

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
