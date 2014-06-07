(function() {
  var app, config, express, fs, models, mongoose, passport, port, server;

  console.log = (global.process.env.NODE_ENV != null) && global.process.env.NODE_ENV === 'production' ? function() {} : console.log;

  express = require('express');

  app = express();

  server = require('http').createServer(app);

  passport = require('passport');

  config = require('./config/config');

  fs = require('fs');

  mongoose = require('mongoose');

  if (global.process.env.NODE_ENV === 'production') {
    mongoose.connect(config.dbURI + '?slaveOk=true&connectTimeoutMS=10000');
  } else {
    mongoose.connect(config.dbURI);
  }

  models = __dirname + '/models';

  fs.readdirSync(models).forEach(function(file) {
    return require(models + '/' + file);
  });

  require('./config/passport')(passport, config);

  require('./config/express')(app, passport);

  require('./config/routes')(app, passport);

  port = process.env.PORT || 3000;

  server.listen(port, function() {
    return console.log("Server running on port " + port);
  });

}).call(this);