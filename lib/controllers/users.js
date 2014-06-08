(function() {
  var Account, Main, Users, mongoose, passwords,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  passwords = require('../modules/passwords');

  mongoose = require('mongoose');

  Account = mongoose.model('Account');

  Main = require('./main');

  Users = (function(_super) {
    __extends(Users, _super);

    function Users() {
      Users.__super__.constructor.call(this, Account);
    }

    Users.prototype.get = function(req, res) {
      return Users.__super__.get.call(this, req, res);
    };

    Users.prototype["delete"] = function(req, res) {
      return Users.__super__["delete"].call(this, req, res);
    };

    Users.prototype.upsert = function(req, res) {
      var body, self, user;
      self = this;
      body = req.body;
      user = {};
      if (body.pass1) {
        if (!body.name || !body.email || !body.pass1 || !body.pass2 || body.pass1 !== body.pass2) {
          res.send(JSON.stringify({
            error: 'Please complete the form'
          }));
          return;
        }
        user.password = passwords.encrypt(body.pass1);
      }
      user.name = body.name;
      user.email = body.email;
      return Users.__super__.upsert.call(this, user, req, res);
    };

    return Users;

  })(Main);

  module.exports = new Users();

}).call(this);
