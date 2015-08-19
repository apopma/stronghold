Stronghold.Views.Footer = Backbone.View.extend ({
  template: JST['layouts/footer'],
  className: 'container',

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  initialize: function () {

  }
});
