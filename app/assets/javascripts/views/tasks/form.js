Stronghold.Views.TaskForm = Backbone.View.extend ({
  template: JST['tasks/form'],
  tagName: 'form',
  className: 'new-task-form',

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    return this;
  },

  initialize: function () {

  }
});
