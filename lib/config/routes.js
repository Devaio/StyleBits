(function() {
  module.exports = function(app, passport) {
    var auth, index, routeMiddleware, users;
    routeMiddleware = function(req, res, next) {
      if (!req.isAuthenticated()) {
        res.redirect("/login");
        return;
      }
      res.locals.user = req.user;
      res.locals.ENV = global.process.env.NODE_ENV;
      return next();
    };
    index = require('../controllers/index');
    app.get('/', index.index);
    auth = require('../controllers/auth');
    app.get('/login', auth.login);
    app.post('/auth', passport.authenticate('local', {
      failureRedirect: '/login'
    }), auth.auth);
    app.get('/logout', auth.logout);
    users = require('../controllers/users');
    return app.post('/users', users.upsert);
  };

}).call(this);
