Stronghold.Collections.Tasks = Backbone.Collection.extend ({
  model: Stronghold.Models.Task,
  url: "api/tasks",

  initialize: function () {
    // body ...
  },

  getOrFetch: function (id) {
    var model = this.get(id);

    if (model) { model.fetch(); }
    else {
      model = new Stronghold.Models.Task({ id: id });

      model.fetch({
        success: function () {
          this.add(model);
        }.bind(this)
      });
    }

    return model;
  }
});
