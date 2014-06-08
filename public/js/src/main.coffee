$ ->


	$(document).on 'scroll', (e) ->
		if $(window).scrollTop() > 100
			$('#floating-nav').addClass('shown')
		else
			$('#floating-nav').removeClass('shown')



			