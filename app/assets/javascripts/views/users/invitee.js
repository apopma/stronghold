Stronghold.Views.Invitee = Backbone.View.extend ({
  template: JST['users/invitee'],

  initialize: function (options) {
    this.userid = options.userid;
    this.username = options.username;
    this.removed = options.removed;
  },

  events: {
    "click .remove-invitee": "removeInviteeField"
  },

  removeInviteeField: function(event) {
    event.preventDefault();
    this.removeFromList(); // Remove the view's ID from parent's internal list.
    this.remove(); // Remove the view from the DOM.
  },

  render: function () {
    var content = this.template({ id: this.userid, username: this.username });
    this.$el.html(content);
    return this;
  }
});
