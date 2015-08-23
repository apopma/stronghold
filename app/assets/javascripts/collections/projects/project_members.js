Stronghold.Collections.ProjectMembers = Backbone.Collection.extend ({
  model: Stronghold.Models.User,
  url: "api/users",

  getOrFetch: function (id) {
    var model = this.get(id);

    if (model) { model.fetch(); }
    else {
      model = new Stronghold.Models.User({ id: id });

      model.fetch({
        success: function () {
          this.add(model);
        }.bind(this)
      });
    }

    return model;
  }
});
