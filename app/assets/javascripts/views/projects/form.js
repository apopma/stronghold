// TODO: prevent form submission with invalid input

Stronghold.Views.ProjectForm = Backbone.CompositeView.extend ({
  template: JST['projects/form'],
  className: 'project-form',
  // collection: router's master list of projects

  events: {
    "click .proj-submit": "createNewProject",
    "typeahead:select .typeahead": "addInviteeField",
    "click .remove-invitee": "removeInviteeField"
  },

  initialize: function() {
    this._inviteesToAssign = [];
  },

  render: function () {
    var content = this.template();
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

  addInviteeField: function (event, item) {
    var id = item.id;
    var username = item.username;
    var view = new Stronghold.Views.Invitee({
      parentView: this,
      userid: id, username: username });

    this.$(".typeahead").typeahead("val", ""); // Clear out the search bar
    this._inviteesToAssign.push(id);    // Store the ID so it's not added twice
    this.addSubview(".invitees", view);
  },

  removeInviteeFromList: function (id) {
    var idx = this._inviteesToAssign.indexOf(id);
    this._inviteesToAssign.splice(idx, 1);
  },

  typeaheadSource: function(query, syncResults, asyncResults) {
    $.ajax({
      url: "/api/users",
      data: { query: query },
      success: function(data, textStatus, jqXHR) {
        var filteredData = _.filter(data, function(user) {
          // Don't show users if they're already being assigned a membership or are the current user.
          return !(_.contains(this._inviteesToAssign, user.id)) && (Stronghold.CURRENT_USER.id != user.id);
        }.bind(this));

        return asyncResults(filteredData);
      }.bind(this)
    });
  },

  createNewProject: function(event) {
    event.preventDefault();

    var formData = this.$(".project-form").serializeJSON();
    formData.invitees = this._inviteesToAssign;
    var newProject = new Stronghold.Models.Project();

    newProject.set(formData);
    newProject.save({}, {
      success: function() {
        var members = this._inviteesToAssign.map(function (id) {
          return newProject.members().getOrFetch(id);
        }.bind(this));

        // update the project's client-side model with its new members + current user
        _.each(members, function(member) { newProject.members().add(member); });
        newProject.members().add(newProject.members().getOrFetch(Stronghold.CURRENT_USER.id));

        this.collection.add(newProject);
        Backbone.history.navigate("projects/" + newProject.id, { trigger: true });
      }.bind(this),

      error: function(model, resp, opts) {
        debugger;
      }
    });
  }
});
