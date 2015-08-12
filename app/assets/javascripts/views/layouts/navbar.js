Stronghold.Views.Navbar = Backbone.View.extend ({
  template: JST['layouts/navbar'],

  initialize: function (options) {
    this.router = options.router;
    this.listenTo(this.router, "route", this.updateActiveNav);
  },

  events: {
    "submit form.logout": "logout"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  logout: function() {
    $.ajax("/session", {
      method: "DELETE",
      success: function() {
        // redirects make AJAX make the same request to the redirect!
        // without this callback, AJAX will try and DELETE "/home"
        // doing this ensures the logout flash shows up nicely
        window.location = "/";
      }
    });
  },

  updateActiveNav: function(route, params) {
    debugger;
  }
});
