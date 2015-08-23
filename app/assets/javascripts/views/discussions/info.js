Stronghold.Views.DiscussionInfo = Backbone.View.extend ({
  template: JST['discussions/info'],
  className: 'info-editable',

  render: function () {
    var content = this.template({ discussion: this.model });
    this.$el.html(content);
    return this;
  },

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
  }
});
