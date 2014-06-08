(function() {
  var config, fs;

  config = require('../config/config');

  fs = require('fs');

  module.exports = function(cb) {
    var models, mongoose;
    cb = cb != null ? cb : function() {};
    mongoose = require('mongoose');
    mongoose.connect(config.dbURI);
    models = __dirname + '/../models';
    fs.readdirSync(models).forEach(function(file) {
      return require(models + '/' + file);
    });
    return cb();
  };

}).call(this);
