  Stronghold.Routers.Router = Backbone.Router.extend ({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.projects = new Stronghold.Collections.Projects();
  },

  routes: {
    "": "projectsIndex",
    "users/:id": "userShow",
    "projects/new": "newProject",
    "projects/:id": "projectShow",
    "projects/:id/edit": "editProject",
    "projects/:id/members": "projectMembers",
    "projects/:id/checklists": "checklistIndex",
    "projects/:id/discussions": "discussionIndex",
    "projects/:project_id/checklists/:id": "checklistShow",
    "projects/:project_id/discussions/:id": "discussionShow",
    "projects/:project_id/checklists/:checklist_id/tasks/:id": "taskShow"
  },

  projectsIndex: function () {
    this.projects.fetch();
    var view = new Stronghold.Views.ProjectsIndex({ collection: this.projects });
    this._swapView(view);
    $("#content").addClass('projects-container');
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
    $("#content").addClass('form-container');
  },

  projectMembers: function(id) {
    var project = this.projects.getOrFetch(id);
    var view = new Stronghold.Views.MembersIndex({
      model: project, collection: project.members()
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

  checklistShow: function(project_id, id) {
    var project = this.projects.getOrFetch(project_id);
    var checklist = project.checklists().getOrFetch(id);
    var view = new Stronghold.Views.ChecklistShow({
      project: project, model: checklist, collection: checklist.tasks(),
      isShowView: true
    });
    this._swapView(view);
  },

  // ---------------------------------------------------------------------------

  taskShow: function(project_id, checklist_id, id) {
    var project = this.projects.getOrFetch(project_id);
    var checklist = project.checklists().getOrFetch(checklist_id);
    var task = project.tasks().getOrFetch(id);
    var view = new Stronghold.Views.TaskShow({
      project: project, checklist: checklist,
      model: task, collection: task.assignedUsers(),
    });
    this._swapView(view);
  },

  // ---------------------------------------------------------------------------

  discussionIndex: function(project_id) {
    var project = this.projects.getOrFetch(project_id);
    var view = new Stronghold.Views.DiscussionIndex({
      model: project,
      collection: project.discussions()
    });
    this._swapView(view);
  },

  discussionShow: function (project_id, id) {
    var project = this.projects.getOrFetch(project_id);
    var discussion = project.discussions().getOrFetch(id);
    var view = new Stronghold.Views.DiscussionShow({
      project: project, model: discussion, collection: discussion.comments()
    });
    this._swapView(view);
  },

  // ---------------------------------------------------------------------------

  userShow: function (id) {
    var user = new Stronghold.Models.User({ id: id });
    user.fetch();
    var view = new Stronghold.Views.UserShow({ model: user });
    this._swapView(view);
  },

  // ---------------------------------------------------------------------------

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    var content = view.render().$el;
    this.$rootEl.html(content);
    this._currentView = view;
    this._removeContentClasses();
  },

  _removeContentClasses: function() {
    $("#content").removeClass("form-container");
    $("#content").removeClass("projects-container");
  }
});
