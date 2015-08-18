Stronghold.Models.Discussion = Backbone.Model.extend ({
  urlRoot: "api/discussions",

  comments: function() {
    if (!this._comments) {
      this._comments = new Stronghold.Collections.Comments([], { discussion: this });
    }

    return this._comments;
  },

  creator: function() {
    if (!this._creator) {
      this._creator = new Stronghold.Models.User([], { discussion: this });
    }

    return this._creator;
  },

  parse: function (response) {
    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    if (response.creator) {
      this.creator().set(response.creator);
      delete response.creator;
    }

    return response;
  }
});
