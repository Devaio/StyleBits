(function() {
  var Schema, accounts, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  accounts = new Schema({
    name: String,
    company: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });

  accounts.pre('save', function(next) {
    return next();
  });

  mongoose.model('Account', accounts);

}).call(this);
