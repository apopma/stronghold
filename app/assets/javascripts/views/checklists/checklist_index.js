Stronghold.Views.ChecklistIndex = Backbone.CompositeView.extend ({
  template: JST['checklists/index'],
  className: 'checklist-index',
  // model: project
  // collection: project.checklists()

  initialize: function () {
    this.collection.each(function (checklist) {
      this.addChecklistView(checklist);
    }.bind(this));

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addChecklistView);
    this.listenTo(this.collection, "remove", this.removeChecklistView);
  },

  events: {
    "click .new-checklist": "openChecklistForm",
    "click .form-submit": "submitNewChecklist",
    "click .form-cancel": "cancelChecklistForm"
  },

  addChecklistView: function(checklist) {
    var subview = new Stronghold.Views.ChecklistIndexItem({
      project: this.model,
      model: checklist,
      collection: checklist.tasks()
    });
    this.addSubview(".checklists", subview);
  },

  removeChecklistView: function(checklist) {
    this.removeModelSubview('.checklists', checklist);
  },

  openChecklistForm: function(){
    var form = JST['checklists/form']();
    this._newChecklistBtn = this.$('.create').html();
    this.$('.create').html(form);
  },

  submitNewChecklist: function (event) {
    event.preventDefault();
    var form = $(event.currentTarget).parent();
    var formData = form.serializeJSON();

    // can't just send the ID, or backbone sends :project_id instead. very stupid.
    var checklist = new Stronghold.Models.Checklist({ project_id: this.model.id });

    checklist.save(formData, {
      success: function() {
        this.collection.add(checklist);
        this.$('.create').html(this._newChecklistBtn);
      }.bind(this),

      error: function(model, resp, opts) {
        debugger;
      }.bind(this)
    });
  },

  cancelChecklistForm: function (event) {
    event.preventDefault();
    this.$('.create').html(this._newChecklistBtn);
  },

  render: function () {
    var index = this;
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
