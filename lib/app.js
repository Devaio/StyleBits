(function() {
  var app, config, env, express, fs, models, mongoose, passport, port, server;

  console.log = (global.process.env.NODE_ENV != null) && global.process.env.NODE_ENV === 'live' ? function() {} : console.log;

  express = require('express');

  app = express();

  server = require('http').createServer(app);

  passport = require('passport');

  config = require('./config/config');

  fs = require('fs');

  env = require('node-env-file');

  if (typeof global.process.env.NODE_ENV === 'undefined') {
    if (fs.existsSync(__dirname + '/../env/development.env')) {
      env(__dirname + '/../env/development.env');
    }
  }

  mongoose = require('mongoose');

  mongoose.connect(global.process.env.MONGOHQ_URI);

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
