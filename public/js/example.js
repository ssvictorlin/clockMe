(function() {
	"use strict";
	
	var next = $('.next');
	var pages = $('.page');
	var animations = [
		'horizontal',
		'horizontal-reverse',
		'vertical',
		'vertical-reverse',
		'horizontal-easing',
		'horizontal-easing-reverse',
		'vertical-easing',
		'vertical-easing-reverse',
		'horizontal-fade',
		'horizontal-fade-reverse',
		'vertical-fade',
		'vertical-fade-reverse'
	];

	var countAnimations = 0;
	var flag = true;
	var isAnim = false;
	var prefix = [
		'webkitAnimationEnd',
		'animationend'
	];

	next.on('click', function() {
		if(isAnim) {
			return false;
		}

		isAnim = true;

		if(flag) {
			$(this).attr('href', '#page-2');
			flag = false;
		} else {
			$(this).attr('href', '#page-1');
			flag = true;
		}

		var nextId = $(this).attr('href');
		
		$(this).attr('transition', animations[countAnimations]);
		countAnimations++;

		if(countAnimations === animations.length) {
			countAnimations = 0;
		}

		for(var i = 0, len = prefix.length; i < len; i++) {
			$(document).on(prefix[i], function() {
				$(document).off(prefix[i]);
				isAnim = false;
			});
		}
	});
})();