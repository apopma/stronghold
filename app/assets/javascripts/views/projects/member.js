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

  render: function () {
    var content = this.template({ member: this.model, project: this.project });
    this.$el.html(content);
    return this;
  }
});
