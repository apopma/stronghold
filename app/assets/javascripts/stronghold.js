window.Stronghold = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new Stronghold.Routers.Router({
      $rootEl: $("#content")
    });

    Backbone.history.start();

    console.log(Stronghold.CURRENT_USER);
  }
};
