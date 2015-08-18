Stronghold.Models.Discussion = Backbone.Model.extend ({
  urlRoot: "api/discussions",

  comments: function() {
    if (!this._comments) {
      this._comments = new Stronghold.Collections.Comments([], { discussion: this });
    }

    return this._comments;
  },

  parse: function (response) {
    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    return response;
  }
});
