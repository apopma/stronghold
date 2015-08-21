Stronghold.Views.ProjectShow = Backbone.CompositeView.extend ({
  template: JST['projects/show'],
  className: 'project-show',
  // model: project
  // model.discussions() and model.checklists()

  initialize: function () {
    this._inviteesToAssign = [];
    this._discussionViews = [];
    this._checklistViews = [];

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.prepopulateInviteeList);
  },

  events: {
    "typeahead:select .typeahead": "addInviteeField",
    "click .remove-invitee": "removeInviteeFromList",
    "click .submit-invitees": "submitNewInvitees",

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

    this.onRender();
    return this;
  },

  onRender: function() {
    // Multiple copies show up otherwise; remove existing subviews first.
    this._discussionViews.forEach(function (discussion) { discussion.remove(); });
    this._checklistViews.forEach(function (view) { view.remove(); });

    this.model.discussions().first(6).forEach(function (discussion) {
      this.addDiscussionSubview(discussion);
    }.bind(this));

    this.model.checklists().first(5).forEach(function (checklist) {
      this.addChecklistSubview(checklist);
    }.bind(this));
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

    var inviteeFields = this.$(".invitees").children().children()
    var invitee_ids = inviteeFields.map(function (_, invitee) {
      return $(invitee).data("id");
    });

    _.each(invitee_ids, function(invitee) {
      var membership = new Stronghold.Models.ProjectMembership({
        project_id: this.model.id, user_id: invitee
      });

      membership.save({}, {
        success: function() {
          // update memberships client-side too
          this.model.members().add(membership);
        }.bind(this)
      });
    }.bind(this));

    this.render();
  },

  prepopulateInviteeList: function() {
    if (this._inviteesToAssign.length !== 0) { return; }

    this.model.members().each(function (member) {
      this._inviteesToAssign.push(member.id);
    }.bind(this));
  },

  // ---------------------------------------------------------------------------

  addDiscussionSubview: function(discussion) {
    var view = new Stronghold.Views.DiscussionIndexItem({
      project: this.model, model: discussion, collection: discussion.comments()
    });
    this.addSubview('.discussions-store', view);
    this._discussionViews.push(view);
  },

  addChecklistSubview: function (checklist) {
    var view = new Stronghold.Views.ChecklistShow({
      project: this.model, model: checklist, collection: checklist.tasks()
    });
    this.addSubview('.checklists-store', view);
    this._checklistViews.push(view);
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
