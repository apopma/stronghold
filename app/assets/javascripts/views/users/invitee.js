Stronghold.Views.Invitee = Backbone.View.extend ({
  template: JST['users/invitee'],

  initialize: function (options) {
    this.userid = options.userid;
    this.username = options.username;
  },

  events: {
    "click .remove-invitee": "removeInviteeField"
  },

  removeInviteeField: function(event) {
    event.preventDefault();
    this.remove();
  },

  render: function () {
    var content = this.template({ id: this.userid, username: this.username });
    this.$el.html(content);
    return this;
  }
});
