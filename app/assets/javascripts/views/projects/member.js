Stronghold.Views.ProjectMember = Backbone.View.extend ({
  template: JST['projects/member'],
  tagName: 'section',
  className: 'member col-md-12',
  // project: project
  // model: user
  // membership: join table record

  initialize: function (options) {
    this.project = options.project;
    this.membership = options.membership;
  },

  render: function () {
    var content = this.template({ member: this.model, membership: this.membership });
    this.$el.html(content);
    return this;
  }
});
