(function() {
  var App, _ref;

  window.Namespace = (_ref = window.Namespace) != null ? _ref : {};

  App = (function() {
    function App() {}

    App.prototype.attachEvents = function() {};

    App.prototype.registerPartials = function() {
      var i, key, _results;
      _results = [];
      for (i in Handlebars.templates) {
        key = i.split('-')[0];
        if (key === 'partial') {
          _results.push(Handlebars.registerPartial(i, Handlebars.templates[i]));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return App;

  })();

  $(function() {
    window.Namespace.App = new App();
    window.Namespace.App.registerPartials();
    return window.Namespace.App.attachEvents();
  });

}).call(this);
