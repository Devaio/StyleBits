(function() {
  var Account, mongoose, passwords;

  passwords = require('../modules/passwords');

  mongoose = require('mongoose');

  Account = mongoose.model('Account');

  module.exports.createAccount = function(req, res) {
    var accountModel, body, user;
    body = req.body;
    if (!body.name || !body.email || !body.pass1 || !body.pass2 || body.pass1 !== body.pass2) {
      res.send(JSON.stringify({
        error: 'Please complete the form'
      }));
      return;
    }
    user = {};
    user.name = body.name;
    user.email = body.email;
    user.password = passwords.encrypt(body.pass1);
    accountModel = new Account(user);
    return accountModel.save(function(err) {
      console.log('ERROR', err);
      if (err) {
        return res.send(JSON.stringify({
          error: 'An error occured. Please try again.'
        }));
      } else {
        return req.logIn(accountModel, function(err) {
          if (err) {
            return next(err);
          }
          return res.redirect('/');
        });
      }
    });
  };

}).call(this);
