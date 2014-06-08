(function() {
  var Schema, moment, mongoose, projects;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  moment = require('moment');

  projects = new Schema({
    title: {
      type: String
    },
    date: {
      type: String,
      "default": moment().format('X')
    },
    content: {
      type: String
    }
  });

  mongoose.model('Project', projects);

}).call(this);
