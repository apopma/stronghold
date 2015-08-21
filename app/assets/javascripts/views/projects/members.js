Stronghold.Views.MemberShow = Backbone.View.extend ({
  template: JST['projects/members'],
  tagName: 'aside',
  className: 'project-members',
  // model: project
  // collection: project.members()

  render: function () {
    var content = this.template({ project: this.model, members: this.collection() });
    this.$el.html(content);
    return this;
  },

  initialize: function () {

  }
});
