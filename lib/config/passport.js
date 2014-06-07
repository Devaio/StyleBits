(function() {
  var Account, LocalStrategy, mongoose, passwords;

  mongoose = require('mongoose');

  Account = mongoose.model('Account');

  passwords = require('../modules/passwords');

  LocalStrategy = require('passport-local').Strategy;

  module.exports = function(passport, config) {
    passport.serializeUser(function(user, done) {
      return done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
      return done(null, obj);
    });
    return passport.use(new LocalStrategy(function(email, pass, done) {
      return Account.findOne({
        email: email
      }, function(error, account) {
        if (!error && account) {
          return passwords.compare(pass, account.password, function(isMatch) {
            if (!isMatch) {
              done(false, false, {
                message: 'Incorrect e-mail / password combination.'
              });
              return;
            }
            account.password = false;
            return done(null, account);
          });
        } else {
          return done(false);
        }
      });
    }));
  };

}).call(this);
