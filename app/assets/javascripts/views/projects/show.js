Stronghold.Views.ProjectShow = Backbone.CompositeView.extend ({
  template: JST['projects/show'],
  className: 'project-show',
  // model has collections: checklists, discussions, files

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "change .invitees :last-child": "addInviteeField",
    "click .remove-invitee": "removeInviteeField",
    "submit form": "submitNewInvitees"
  },

  addInviteeField: function (event) {
    console.log("add field!");
    $(event.target).prop("disabled", true);
    var $newInputField = this.newInputField();
    this.$('.invitees').append($newInputField);
  },

  removeInviteeField: function (event) {
    event.preventDefault();
    console.log("field remove!");
  },

  newInputField: function() {
    // TODO: make this not be terrible
    return '<div class="invitee-field"> <input type="text" name="invitees[]"> <button class="remove-invitee">&times;</button> </div>';
  },

  submitNewInvitees: function(event) {
    event.preventDefault;
    this.$("input").prop("disabled", false);

    var project = this;
    var formData = $(event.currentTarget).serializeJSON();
    formData.invitees.pop(); // last element is always an empty string

    formData.invitees.forEach(function (invitee) {
      var membership = new Stronghold.Models.ProjectMembership({
        query: invitee,
        project_id: project.model.id
      });

      membership.save(); // TODO: inform user if records don't exist
    });
  },

  render: function () {
    var index = this;
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
