Stronghold.Views.ProjectMember = Backbone.View.extend ({
  template: JST['projects/member'],
  tagName: 'section',
  className: 'member col-md-12',
  // project: project
  // model: user

  initialize: function (options) {
    this.project = options.project;
  },

  render: function () {
    var content = this.template({ member: this.model });
    this.$el.html(content);
    return this;
  }
});
