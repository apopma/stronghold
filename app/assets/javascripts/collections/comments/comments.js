Stronghold.Collections.Comments = Backbone.Collection.extend ({
  model: Stronghold.Models.Comment,
  url: "api/comments",

  getOrFetch: function (id) {
    var model = this.get(id);

    if (model) { model.fetch(); }
    else {
      model = new Stronghold.Models.Comment({ id: id });

      model.fetch({
        success: function () {
          this.add(model);
        }.bind(this)
      });
    }

    return model;
  }
});
