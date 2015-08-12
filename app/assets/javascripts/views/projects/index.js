Stronghold.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],
  className: 'projects-index',
  // collection: current_user.projects

  initialize: function() {
    this.listenTo(this.collection, "add", this.addProjectView);
    this.listenTo(this.collection, "remove", this.removeProjectView);
    this.collection.each(this.addProjectView.bind(this));
    // implicit passing of collection elements
    // 'remove' events pass the model being removed as the first arg
  },

  addProjectView: function(project) {
    var projectSubview = new Stronghold.Views.ProjectIndexItem({ model: project });
    this.addSubview(".projects", projectSubview);
  },

  removeProjectView: function(project) {
    this.removeModelSubview(".projects", project);
  },

  render: function () {
    var index = this;
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});


// removeModelSubview for destroy
