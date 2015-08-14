Stronghold.Collections.Checklists = Backbone.Collection.extend ({
  model: Stronghold.Models.Checklist,
  url: "api/checklists/",

  getOrFetch: function (id) {
    var model = this.get(id);

    if (model) { model.fetch(); }
    else {
      model = new Stronghold.Models.Checklist({ id: id });

      model.fetch({
        success: function () {
          this.add(model);
        }.bind(this)
      });
    }

    return model;
  }
});
