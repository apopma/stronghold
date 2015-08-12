Stronghold.Routers.Router = Backbone.Router.extend ({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.projects = new Stronghold.Collections.Projects();
  },

  routes: {
    "": "projectsIndex",
    "projects/:id": "projectShow"
  },

  projectsIndex: function () {
    this.projects.fetch();
    var view = new Stronghold.Views.ProjectsIndex({ collection: this.projects });
    this._swapView(view);
  },

  projectShow: function(id) {

  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    var content = view.render().$el;
    this.$rootEl.html(content);
    this._currentView = view;
  }
});
