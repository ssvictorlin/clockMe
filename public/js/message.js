
var socket = io();

var next = $('.next');
var pages = $('.page');
var animations = [
    'horizontal',
    'horizontal-reverse',
];

var flag = true;
var isAnim = false;
var prefix = [
    'webkitAnimationEnd',
    'animationend'
];

socket.on('welcome', function(data) {
    //console.log("receiving message...");
    addMessage(data.message);
    socket.emit('req-swipe', {swipe: 'none'});
});

socket.on('res-swipe', function (data) {
    //console.log("receiving swipe...");
    addMessage(data.message);
    socket.emit('req-swipe', {swipe: 'none'});
});

function addMessage(message) {
    console.log("message is: " + message);
    if (message == 'left') {
        console.log("trying to turn left");
        slideTo(message);    
    } else if (message == 'right') {
        console.log("trying to turn right");
        slideTo(message);   
    }
}

function slideTo (dir) {
    if(isAnim) {
            return false;
        }

    isAnim = true;

    if(dir == 'left') {
        $(this).attr('href', '#page-1');
        $(this).attr('transition', animations[1]);
    } else  if (dir == 'right') {
        $(this).attr('href', '#page-2');
        $(this).attr('transition', animations[0]);
    }

    for(var i = 0, len = prefix.length; i < len; i++) {
        $(document).on(prefix[i], function() {
            $(document).off(prefix[i]);
            isAnim = false;
        });
    }
}
