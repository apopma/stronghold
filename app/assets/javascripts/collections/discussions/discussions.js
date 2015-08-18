Stronghold.Collections.Discussions = Backbone.Collection.extend ({
  model: Stronghold.Models.Discussion,
  url: "api/discussions",

  getOrFetch: function (id) {
    var model = this.get(id);

    if (model) { model.fetch(); }
    else {
      model = new Stronghold.Models.Discussion({ id: id });

      model.fetch({
        success: function () {
          this.add(model);
        }.bind(this)
      });
    }

    return model;
  }
});
