Stronghold.Views.DiscussionForm = Backbone.View.extend ({
  template: JST['discussions/form'],
  tagName: 'form',
  className: 'discussion-form',
  // project: owning project
  // model: new or existing discussion
  // collection: project.discussions()
  // actionType: "create" or "update"

  initialize: function(options) {
    this.project = options.project;
    this.actionType = options.actionType;
    this.removeFromParentView = options.removeFromParentView;
  },

  events: {
    "click .new-discussion-submit": "create",
    "click .edit-discussion-submit": "update",
    "click .discussion-cancel": "cancel"
  },

  render: function () {
    var content = this.template({
      project: this.project,
      discussion: this.model,
      actionType: this.actionType
   });

    this.$el.html(content);
    this.$('.wysihtml5').wysihtml5({
      toolbar: {
        "fa": true,
        "image": false,
        "link": false,
        "blockquote": false
      }
    });
    return this;
  },

  // ---------------------------------------------------------------------------

  create: function(event) {
    event.preventDefault();
    var form = $(event.currentTarget).parent();
    var formData = form.serializeJSON();
    formData.body = form.find(".form-content").html();
    if (this.$(".wysihtml5").data("placeholder") === formData.body) {
      formData.body = null; // set empty body if none given
    }

    this.model.set(formData);
    this.model.save({ project_id: this.project.id }, {
      success: function() {
        this.collection.add(this.model);
      }.bind(this),

      error: function (model, resp, opts) {
        debugger;
      }
    });

    this.removeFromParentView();
  },

  update: function(event) {
    event.preventDefault();
    var form = $(event.currentTarget).parent();
    var formData = form.serializeJSON();
    formData.body = form.find(".form-content").html();
    if (this.$(".wysihtml5").data("placeholder") === formData.body) {
      formData.body = null; // set empty body if none given
    }

    this.model.save(formData, {
      success: function() {
        this.model.set("title", formData.title);
        this.model.set("body", formData.body);
      }.bind(this)
    });
    this.removeFromParentView();
  },

  cancel: function(event) {
    event.preventDefault();
    this.removeFromParentView();
  }
});
