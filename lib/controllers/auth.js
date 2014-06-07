(function() {
  module.exports.login = function(req, res) {
    if (!req.isAuthenticated()) {
      return res.render('login');
    } else {
      return res.redirect('/');
    }
  };

  module.exports.logout = function(req, res) {
    req.logout();
    return res.redirect('/');
  };

  module.exports.auth = function(req, res) {
    return res.redirect('/');
  };

}).call(this);
