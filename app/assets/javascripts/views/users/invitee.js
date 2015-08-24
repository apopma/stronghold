Stronghold.Views.Invitee = Backbone.View.extend ({
  template: JST['users/invitee'],

  initialize: function (options) {
    this.userid = options.userid;
    this.username = options.username;
    this.parentView = options.parentView;
  },

  events: {
    "click .remove-invitee": "removeInviteeField"
  },

  removeInviteeField: function(event) {
    event.preventDefault();
    var id = $(event.currentTarget).data("id");
    this.parentView.removeInviteeFromList(id);
    this.parentView.removeSubview(".invitees", this);
  },

  render: function () {
    var content = this.template({ id: this.userid, username: this.username });
    this.$el.html(content);
    return this;
  }
});
