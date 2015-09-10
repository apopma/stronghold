window.Stronghold = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new Stronghold.Routers.Router({
      $rootEl: $("#content")
    });

    var navbar = new Stronghold.Views.Navbar({ router: router });
    var footer = new Stronghold.Views.Footer({ router: router });
    $('#navbar').html(navbar.render().$el);
    $('#footer').html(footer.render().$el);

    Backbone.history.start();
  }
};
