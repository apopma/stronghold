Stronghold.Routers.Router = Backbone.Router.extend ({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = new Stronghold.Collections.Projects();
  },

  routes: {
    "": "projectsIndex",
    "/projects/:id": "projectShow"
  },

  projectsIndex: function () {
    this.collection.fetch();
    var view = new Stronghold.Views.ProjectsIndex({ collection: this.collection });
    this._swapView(view);
  },

  projectShow: function(id) {

  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    var content = view.render().$el;
    this.$el.html(content);
    this._currentView = view;
  }
});
