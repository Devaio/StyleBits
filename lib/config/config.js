(function() {
  var config;

  config = {
    production: {
      env: 'production',
      baseURI: 'http://mysite.com'
    },
    staging: {
      env: 'staging',
      baseURI: 'http://mystagingsite.com'
    },
    development: {
      env: 'development',
      baseURI: 'http://localhost:3000',
      dbURI: 'mongodb://localhost/hdbootstrap'
    }
  };

  module.exports = global.process.env.NODE_ENV ? config[global.process.env.NODE_ENV] : config.development;

}).call(this);
