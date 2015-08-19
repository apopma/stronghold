Stronghold.Views.ProjectShow = Backbone.CompositeView.extend ({
  template: JST['projects/show'],
  className: 'project-show',
  // model: project
  // several collections: checklists, discussions, files

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "change .invitees :last-child": "addInviteeField",
    "click .remove-invitee": "removeInviteeField",
    "submit form.new-invites-form": "submitNewInvitees",

    "dblclick .project-info": "openInfoEdit",
    "click .cancel": "cancelInfoEdit",
    "click .submit": "submitEditedInfo",

    "click .delete-project": "deleteProject"
  },

  addInviteeField: function (event) {
    $(event.target).prop("disabled", true);
    var $newInputField = JST['projects/_invitee_form']();
    this.$('.invitees').append($newInputField);
  },

  removeInviteeField: function (event) {
    event.preventDefault();
  },

  submitNewInvitees: function(event) {
    event.preventDefault();
    this.$("input").prop("disabled", false);

    var project = this;
    var formData = $(event.currentTarget).serializeJSON();
    formData.invitees.pop(); // last element is always an empty string

    // would be nice to make this a batch
    formData.invitees.forEach(function (invitee) {
      var membership = new Stronghold.Models.ProjectMembership({
        query: invitee,
        project_id: project.model.id
      });

      membership.save({}, {
        success: function() {
          // ensures project's members show up in index w/o refresh
          project.model.members().add(membership);
        }.bind(this)
      }); // TODO: inform user if records don't exist
    });

    this.render();
  },

  openInfoEdit: function(event) {
    var inputTemplate = JST['projects/_info'];
    var $targetEl = $(event.currentTarget).parent(); // header
    this._prevTitle = $targetEl.find(".project-title").text();
    this._prevDesc = $targetEl.find(".project-description").text();

    $targetEl.html(inputTemplate({
      prevTitle: this._prevTitle, prevDesc: this._prevDesc
    }));
  },

  submitEditedInfo: function(event) {
    event.preventDefault();

    var $targetEl = $(event.currentTarget).parent();
    var $header = $targetEl.parent();
    var updatedAttrs = $targetEl.serializeJSON();

    this.model.set(updatedAttrs);
    this.model.save({}, {});
  },

  cancelInfoEdit: function (event) {
    event.preventDefault();
    this.render();
  },

  deleteProject: function (event) {
    event.preventDefault();
    var c = window.confirm("Do you really want to abandon your evil plan?\nEverything about this project will be permanently deleted.");
    if (c) {
      this.model.destroy({
        success: function() {
          this.model.clear();
          Backbone.history.navigate("#", { trigger: true });
        }.bind(this)
      });
    }
  },

  render: function () {
    var content = this.template({
      project: this.model,
      numDiscussions: this.model.discussions().length,
      numChecklists: this.model.checklists().length,
      numTasks: this.model.tasks().length,
      numProjectMembers: this.model.members().length
     });
     
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
