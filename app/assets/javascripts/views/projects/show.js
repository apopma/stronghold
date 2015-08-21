Stronghold.Views.ProjectShow = Backbone.CompositeView.extend ({
  template: JST['projects/show'],
  className: 'project-show',
  // model: project
  // several collections: checklists, discussions, files

  initialize: function () {
    this._inviteesToAssign = [];
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.prepopulateInviteeList);
  },

  events: {
    "typeahead:select .typeahead": "addInviteeField",
    "click .remove-invitee": "removeInviteeFromList",
    "submit form.new-invites-form": "submitNewInvitees",

    "dblclick .project-info": "openInfoEdit",
    "click .cancel": "cancelInfoEdit",
    "click .submit": "submitEditedInfo",

    "click .delete-project": "deleteProject"
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

    this.$('.typeahead').typeahead({
      minLength: 3,
      highlight: true
    },
    { // dataset options
      name: 'searched-users',
      limit: 10, // actually 5; bugfix mandates this being (2 * actual limit)
      display: function(obj) { return obj.username },
      templates: { suggestion: JST["users/search_item"] },
      source: this.typeaheadSource.bind(this)
    });

    return this;
  },

  // ---------------------------------------------------------------------------

  addInviteeField: function (event, item) {
    var id = item.id;
    var username = item.username;
    var view = new Stronghold.Views.Invitee({
      removeFromList: this.removeInviteeFromList.bind(this, id),
      userid: id, username: username });

    this.$(".typeahead").typeahead("val", ""); // Clear out the search bar
    this._inviteesToAssign.push(id);    // Store the ID so it's not added twice
    this.addSubview(".invitees", view);
  },

  removeInviteeFromList: function (id) {
    var idx = this._inviteesToAssign.indexOf(id);
    this._inviteesToAssign.splice(idx, 1);
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

  prepopulateInviteeList: function() {
    if (this._inviteesToAssign.length !== 0) { return; }

    this.model.members().each(function (member) {
      this._inviteesToAssign.push(member.id);
    }.bind(this));
  },

  // ---------------------------------------------------------------------------

  openInfoEdit: function(event) {
    var inputTemplate = JST['projects/_info'];
    var $targetEl = $(event.currentTarget).parent(); // header
    this._prevTitle = $targetEl.find(".project-title").text();
    this._prevDesc = $targetEl.find(".project-description").text();

    $targetEl.html(inputTemplate({
      prevTitle: this._prevTitle, prevDesc: this._prevDesc
    }));
  },

  cancelInfoEdit: function (event) {
    event.preventDefault();
    this.render();
  },

  submitEditedInfo: function(event) {
    event.preventDefault();

    var $targetEl = $(event.currentTarget).parent();
    var $header = $targetEl.parent();
    var updatedAttrs = $targetEl.serializeJSON();

    this.model.set(updatedAttrs);
    this.model.save({}, {});
  },

  // ---------------------------------------------------------------------------

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

  typeaheadSource: function(query, syncResults, asyncResults) {
    $.ajax({
      url: "/api/users",
      data: { query: query },
      success: function(data, textStatus, jqXHR) {
        var filteredData = _.filter(data, function(user) {
          // Don't show users if a membership already exists or they're the current user.
          return !(_.contains(this._inviteesToAssign, user.id)) && (Stronghold.CURRENT_USER.id != user.id);
        }.bind(this));

        return asyncResults(filteredData);
      }.bind(this)
    });
  }
});
