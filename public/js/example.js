(function() {
	"use strict";
	
	var next = $('.next');
	var pages = $('.page');
	var animations = [
		'horizontal',
		'horizontal-reverse',
	];

	var countAnimations = 0;
	var flag = true;
	var isAnim = false;
	var prefix = [
		'webkitAnimationEnd',
		'animationend'
	];

	next.bind('click', function(event, dir) {
        console.log("direction is "+dir);
		if(isAnim) {
			return false;
		}

		isAnim = true;
        var current = document.getElementsByClassName('current-page');
        var cur_id = current[0].id;
        console.log("current page: " + cur_id);
		if(dir == 'left' && cur_id == 'page-2') {
			$(this).attr('href', '#page-1');
			flag = true;
		    $(this).attr('transition', animations[0]);
		} else if (dir == 'right' && cur_id == 'page-1') {
			$(this).attr('href', '#page-2');
			flag = false;
		    $(this).attr('transition', animations[1]);
		}

		//var nextId = $(this).attr('href');
		
		//$(this).attr('transition', animations[countAnimations]);


		for(var i = 0, len = prefix.length; i < len; i++) {
			$(document).on(prefix[i], function() {
				$(document).off(prefix[i]);
				isAnim = false;
			});
		}
    });
})();
