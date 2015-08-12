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
    $.ajax("/session", { method: "DELETE" });
  },

  updateActiveNav: function(route, params) {
    debugger;
  }
});
