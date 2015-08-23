Stronghold.Views.ProjectMember = Backbone.View.extend ({
  template: JST['projects/member'],
  tagName: 'section',
  className: 'member col-md-12',
  // project: project
  // model: user

  initialize: function (options) {
    this.project = options.project;
    this.membership = options.membership;

    this.listenTo(this.project, "sync change", this.render);
  },

  events: {
    'click .delete-membership': 'destroy',
    'click .admin-toggle': 'toggle'
  },

  render: function () {
    var content = this.template({ member: this.model, project: this.project });
    this.$el.html(content);
    return this;
  },

  // ---------------------------------------------------------------------------

  toggle: function() {

  },

  destroy: function (event) {
    event.preventDefault();
    var membership = {
      user_id: $(event.currentTarget).data("id"),
      project_id: this.project.id
    };

    $.ajax({
      url: "api/project_memberships",
      method: "DELETE",
      data: membership,

      success: function() {
        this.remove();
      }.bind(this)
    });
  }
});
