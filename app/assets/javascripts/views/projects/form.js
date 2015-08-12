Stronghold.Views.ProjectForm = Backbone.View.extend ({
  template: JST['projects/form'],

  initialize: function () {

  },

  events: {
    "submit form": "createNewProject",
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

  createNewProject: function() {
    debugger;
  }
});
