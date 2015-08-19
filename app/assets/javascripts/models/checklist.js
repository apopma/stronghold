Stronghold.Models.Checklist = Backbone.Model.extend ({
  urlRoot: "api/checklists",

  tasks: function() {
    if (!this._tasks) {
      this._tasks = new Stronghold.Collections.Tasks([], { checklist: this });
    }
    return this._tasks;
  },

  comments: function() {
    if (!this._comments) {
      this._comments = new Stronghold.Collections.Comments([], { checklist: this });
    }
    return this._comments;
  },

  creator: function() {
    if (!this._creator) {
      this._creator = new Stronghold.Models.User([], { checklist: this });
    }
    return this._creator
  },

  parse: function(response) {
    if (response.tasks) {
      this.tasks().set(response.tasks, { parse: true });
      delete response.tasks;
    }

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
