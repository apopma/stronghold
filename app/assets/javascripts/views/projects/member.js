Stronghold.Views.ProjectMember = Backbone.View.extend ({
  template: JST['projects/member'],
  tagName: 'section',
  className: 'member col-md-12',
  // project: project
  // model: user
  // parentView: members index

  initialize: function (options) {
    this.project = options.project;
    this.membership = options.membership;
    this.parentView = options.parentView;

    this.listenTo(this.project, "sync change", this.render);
    this.listenTo(this.model, "sync change", this.render);
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
    var newAdminState = $(event.target).prop("checked");
    var membership = {
      user_id: $(event.target).data("id"),
      project_id: this.project.id,
      admin: newAdminState
    };

    $.ajax({
      url: "api/project_memberships",
      method: "PATCH",
      data: membership
    });
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
        this.parentView.removeInviteeFromList($(event.currentTarget).data("id"));
        this.remove();
      }.bind(this)
    });
  }
});
