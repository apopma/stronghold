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
    "projects/:project_id/checklists/:id": "checklistIndex"
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

  checklistIndex: function(project_id, id) {
    var view = new Stronghold.Views.ChecklistIndex({
      // search projects collection by project_id
      // find project's checklists, pass in as this.collection
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
