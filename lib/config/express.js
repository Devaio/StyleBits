(function() {
  var RedisStore, express;

  express = require('express');

  RedisStore = require('connect-redis')(express);

  module.exports = function(app, passport) {
    app.configure(function() {
      var redis, rtg;
      app.set('views', __dirname + '/../../views');
      app.set('view engine', 'jade');
      app.set('view options', {
        layout: false
      });
      app.use(express.bodyParser());
      app.use(express.cookieParser());
      app.use(express.methodOverride());
      app.use(express.compress());
      app.use('/public', express["static"](__dirname + '/../../public', {
        maxAge: 86400000
      }));
      app.use('/components', express["static"](__dirname + '/../../bower_components', {
        maxAge: 86400000
      }));
      app.use(express.favicon());
      if (process.env.REDISTOGO_URL) {
        rtg = require('url').parse(process.env.REDISTOGO_URL);
        redis = require('redis').createClient(rtg.port, rtg.hostname);
        redis.auth(rtg.auth.split(':')[1]);
        app.use(express.session({
          secret: process.env.REDIS_SECRET || "super secret string",
          maxAge: new Date(Date.now() + 7200000),
          store: new RedisStore({
            client: redis,
            ttl: 7200
          })
        }));
      } else {
        app.use(express.cookieParser());
        app.use(express.cookieSession({
          secret: "nullstrap"
        }));
      }
      app.use(passport.initialize());
      app.use(passport.session());
      return app.use(app.router);
    });
    return app.ensureAuthenticated = function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      return res.redirect("/login");
    };
  };

}).call(this);
