Stronghold.Views.ProjectShow = Backbone.CompositeView.extend ({
  template: JST['projects/show'],
  className: 'project-show',
  // model: project
  // model.discussions() and model.checklists()

  initialize: function () {
    this._discussionViews = [];
    this._checklistViews = [];

    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "dblclick .project-info": "openInfoEdit",
    "click .cancel": "cancelInfoEdit",
    "click .submit": "submitEditedInfo",

    "click .delete-project": "deleteProject"
  },

  render: function () {
    var content = this.template({
      project: this.model,
      numDiscussions: this.model.discussions().length,
      numChecklists: this.model.checklists().length,
      numTasks: this.model.tasks().length,
      numProjectMembers: this.model.members().length
     });

    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },

  onRender: function() {
    // Multiple copies show up otherwise; remove existing subviews first.
    this._discussionViews.forEach(function (discussion) { discussion.remove(); });
    this._checklistViews.forEach(function (view) { view.remove(); });

    this.model.discussions().first(6).forEach(function (discussion) {
      this.addDiscussionSubview(discussion);
    }.bind(this));

    this.model.checklists().first(5).forEach(function (checklist) {
      this.addChecklistSubview(checklist);
    }.bind(this));
  },

  // ---------------------------------------------------------------------------

  addDiscussionSubview: function(discussion) {
    var view = new Stronghold.Views.DiscussionIndexItem({
      project: this.model, model: discussion, collection: discussion.comments()
    });
    this.addSubview('.discussions-store', view);
    this._discussionViews.push(view);
  },

  addChecklistSubview: function (checklist) {
    var view = new Stronghold.Views.ChecklistShow({
      project: this.model, model: checklist, collection: checklist.tasks()
    });
    this.addSubview('.checklists-store', view);
    this._checklistViews.push(view);
  },

  // ---------------------------------------------------------------------------

  openInfoEdit: function(event) {
    var inputTemplate = JST['projects/_info'];
    var $targetEl = $(event.currentTarget).parent(); // header
    this._prevTitle = $targetEl.find(".project-title").text();
    this._prevDesc = $targetEl.find(".project-description").text();

    $targetEl.html(inputTemplate({
      prevTitle: this._prevTitle, prevDesc: this._prevDesc
    }));
  },

  cancelInfoEdit: function (event) {
    event.preventDefault();
    this.render();
  },

  submitEditedInfo: function(event) {
    event.preventDefault();

    var $targetEl = $(event.currentTarget).parent();
    var $header = $targetEl.parent();
    var updatedAttrs = $targetEl.serializeJSON();

    this.model.set(updatedAttrs);
    this.model.save({}, {});
  },

  // ---------------------------------------------------------------------------

  deleteProject: function (event) {
    event.preventDefault();
    var c = window.confirm("Do you really want to abandon your evil plan?\nEverything about this project will be permanently deleted.");
    if (c) {
      this.model.destroy({
        success: function() {
          this.model.clear();
          Backbone.history.navigate("#", { trigger: true });
        }.bind(this)
      });
    }
  }
});
