var usonic = require('mmm-usonic');
var leftState = false;
var rightState = false;


module.exports = function (io) {

    setInterval(measureDistance, 100);
    io.sockets.on('connection', function (socket) {
        console.log("sending message..."); 
        socket.emit('welcome', { message: 'Welcome!'});
    });
};


function measureDistance() {
    var sensorLeft = usonic.createSensor(24, 23, 450);
    var sensorRight = usonic.createSensor(22, 27, 450);
    var distanceLeft = sensorLeft();
    console.log("Left distance is " + distanceLeft);
    var distanceRight = sensorRight();
    console.log("Right distance is " + distanceRight);

    if (!leftState && !rightState) {
        if (distanceLeft < 20) {
            leftState = true;
        }
        else if (distanceRight < 20) {
            rightState = true;
        }
    } 
    else if (leftState && rightState) {
        console.log("both too close...");
        leftState = false;
        rightState = false;
    }
    else {
        if (leftState && distanceRight < 20) {

            console.log("Swipe right...");
            leftState = false;
        }
        else if (rightState && distanceLeft < 20) {

            console.log("Swipe left...");
            rightState = false;
        }
    }
}
