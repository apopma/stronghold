Stronghold.Routers.Router = Backbone.Router.extend ({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.projects = new Stronghold.Collections.Projects();
  },

  routes: {
    "": "projectsIndex",
    "projects/new": "newProject",
    "projects/:id": "projectShow",
    "projects/:id/edit": "editProject",
    "projects/:id/checklists/": "checklistIndex"
  },

  projectsIndex: function () {
    this.projects.fetch();
    var view = new Stronghold.Views.ProjectsIndex({ collection: this.projects });
    this._swapView(view);
  },

  projectShow: function(id) {
    var project = this.projects.getOrFetch(id);
    var view = new Stronghold.Views.ProjectShow({ model: project });
    this._swapView(view);
  },

  newProject: function () {
    var view = new Stronghold.Views.ProjectForm({
      collection: this.projects
    });
    this._swapView(view);
  },

  editProject: function(id) {
    var view = new Stronghold.Views.ProjectForm({

    });
    this._swapView(view);
  },

  // ---------------------------------------------------------------------------

  checklistIndex: function(id) {
    var project = this.projects.getOrFetch(id);

    var view = new Stronghold.Views.ChecklistIndex({
      model: project,
      collection: project.checklists()
    });
    this._swapView(view);
  },

  // ---------------------------------------------------------------------------

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    var content = view.render().$el;
    this.$rootEl.html(content);
    this._currentView = view;
  }
});
