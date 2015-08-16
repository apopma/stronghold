Stronghold.Views.TaskOptions = Backbone.View.extend({
  template: JST["tasks/options"],

  initialize: function() {

  },

  events: {},

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    return this;
  }
});
