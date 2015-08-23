Stronghold.Views.MembersIndex = Backbone.CompositeView.extend ({
  template: JST['projects/members'],
  tagName: 'aside',
  className: 'project-members row',
  // model: project
  // collection: project.members()

  initialize: function () {
    this._inviteesToAssign = [];

    this.collection.each(function(member) {
      this.addMemberView(member);
    }.bind(this));

    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model, "sync", this.prepopulateInviteeList);
    this.listenTo(this.collection, "add", this.addMemberView);
    this.listenTo(this.collection, "remove", this.removeMemberView);
  },

  render: function () {
    var content = this.template({ project: this.model, members: this.collection });
    this.$el.html(content);
    this.attachSubviews();

    this.$('.typeahead').typeahead({
      minLength: 3,
      highlight: true
    },
    { // dataset options
      name: 'searched-users',
      limit: 10, // actually 5; bugfix mandates this being (2 * actual limit)
      display: function(obj) { return obj.username; },
      templates: { suggestion: JST["users/search_item"] },
      source: this.typeaheadSource.bind(this)
    });

    return this;
  },

  events: {
    "typeahead:select .typeahead": "addInviteeField",
    "click .remove-invitee": "removeInviteeFromList",
    "click .submit-invitees": "submitNewInvitees"
  },

  // ---------------------------------------------------------------------------

  addMemberView: function(member) {
    var view = new Stronghold.Views.ProjectMember({
      project: this.model, model: member, parentView: this
    });
    this.addSubview(".members-container", view);
  },

  removeMemberView: function(member) {
    var idx = this._inviteesToAssign.indexOf(member.id);
    console.log(this._inviteesToAssign);
    this._inviteesToAssign.splice(idx, 1);
    console.log(this._inviteesToAssign);
    this.removeModelSubview(".members-container", member);
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

    _.each(invitee_ids, function(invitee_id) {
      var membership = new Stronghold.Models.ProjectMembership({
        project_id: this.model.id, user_id: invitee_id
      });

      membership.save({}, {
        success: function() {
          // update memberships client-side too
          this.collection.getOrFetch(invitee_id);
        }.bind(this)
      });
    }.bind(this));

    this.render();
  },

  prepopulateInviteeList: function() {
    if (this._inviteesToAssign.length !== 0) { return; }

    this.collection.each(function (member) {
      this._inviteesToAssign.push(member.id);
    }.bind(this));

    console.log(this._inviteesToAssign);
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
