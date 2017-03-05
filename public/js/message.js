
var socket = io();

socket.on('welcome', function(data) {
    console.log("receiving message...");
    addMessage(data.message);
    socket.emit('req-swipe', {swipe: 'none'});
});

socket.on('res-swipe', function (data) {
    console.log("receiving swipe...");
    addMessage(data.message);
    socket.emit('req-swipe', {swipe: 'none'});
});

function addMessage(message) {
    
    console.log("message is: " + message);
    if (message == 'left') {
        console.log("trying to turn page");
        $('button').trigger('click');    
    }
}
