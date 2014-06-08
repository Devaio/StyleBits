(function() {
  var Main, Project, Projects, mongoose,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mongoose = require('mongoose');

  Project = mongoose.model('Project');

  Main = require('./main');

  Projects = (function(_super) {
    __extends(Projects, _super);

    function Projects() {
      Projects.__super__.constructor.call(this, Project);
    }

    Projects.prototype.get = function(req, res) {
      return Projects.__super__.get.call(this, req, res);
    };

    Projects.prototype["delete"] = function(req, res) {
      return Projects.__super__["delete"].call(this, req, res);
    };

    Projects.prototype.upsert = function(req, res) {
      var body, project, self;
      self = this;
      body = req.body;
      project = {};
      project.title = body.title;
      return Projects.__super__.upsert.call(this, project, req, res);
    };

    return Projects;

  })(Main);

  module.exports = new Projects();

}).call(this);
