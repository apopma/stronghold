Stronghold.Collections.Projects = Backbone.Collection.extend({
  model: Stronghold.Models.Project,
  url: "api/projects",

  getOrFetch: function (id) {
    var model = this.get(id);

    if (model) { model.fetch(); }
    else {
      model = new Stronghold.Models.Project({ id: id });

      model.fetch({
        success: function () {
          this.add(model);
        }.bind(this),

        error: function () {
          this.remove(model);
        }
      });
    }

    return model;
  }
});
