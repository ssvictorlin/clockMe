
var socket = io();

var flag1 = false, flag2 = false;

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
    //console.log("message is: " + message);
    if (message == 'left') {
        if (!flag1) {
            flag1 = true;
            console.log("trying to turn left");
            $('button').trigger('click', ['left']);
        }  
    } else if (message == 'right') {
        if (!flag2) {
            flag2 = true;
            console.log("trying to turn right");
            $('button').trigger('click', ['right']);  
        }
    } else {
       flag1 = false;
       flag2 = false;
    }
}

