
var socket = io();

socket.on('welcome', function(data) {
    console.log("receiving message...");
    addMessage(data.message);
});

function addMessage(message) {
    var text = document.createTextNode(message),
        el = document.createElement('li'),
        messages = document.getElementById('messages');

    el.appendChild(text);
    messages.appendChild(el);
}
