Stronghold.Models.Comment = Backbone.Model.extend ({
  urlRoot: "api/comments",

  commenter: function() {
    if (!this._commenter) {
      this._commenter = new Stronghold.Models.User({ comment: this });
    }

    return this._commenter;
  },

  parse: function (response) {
    if (response.commenter) {
      this.commenter().set(response.commenter);
      delete response.commenter;
    }

    return response;
  }
});
