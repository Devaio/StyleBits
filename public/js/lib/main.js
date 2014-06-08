(function() {
  $(function() {
    return $(document).on('scroll', function(e) {
      if ($(window).scrollTop() > 100) {
        return $('#floating-nav').addClass('shown');
      } else {
        return $('#floating-nav').removeClass('shown');
      }
    });
  });

}).call(this);
