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
    $('#navbar').html(navbar.render().$el);

    Backbone.history.start();

    console.log(Stronghold.CURRENT_USER);
  }
};
