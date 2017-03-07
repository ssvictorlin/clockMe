var usonic = require('mmm-usonic');
var gpio = require('mmm-gpio');
//var leftLED = gpio.createOutput(26);
//var rightLED = gpio.createOutput(17);
var leftState = [0,0,0,0,0,0,0,0,0,0];
var rightState = [0,0,0,0,0,0,0,0,0,0];
var swipe = null;
module.exports = function (io) {
    
    setTimeout(measureDistance, 100);
    io.sockets.on('connection', function (socket) {
        //console.log("sending message..."); 
        socket.emit('welcome', { message: 'Welcome!'});

        socket.on('req-swipe', function (data) {
            //console.log("receiving swipe req message..."); 
            if (swipe == 'left') { 
                socket.emit('res-swipe', { message: 'left'});
            } else if (swipe == 'right') {
                socket.emit('res-swipe', { message: 'right'});
            } else {
                socket.emit('res-swipe', { message: 'none'})
            }
            swipe = null;
        });
    }); 
};


function measureDistance() {
    var leftLED = gpio.createOutput(26);
    var rightLED = gpio.createOutput(5);
    var sensorLeft = usonic.createSensor(25, 23, 450);
    var sensorRight = usonic.createSensor(13, 6, 450);
    var distanceLeft = sensorLeft();
    console.log("Left distance is " + distanceLeft);
    var distanceRight = sensorRight();
    //console.log("Right distance is " + distanceRight);

    if (distanceLeft > 0 && distanceLeft < 20) {
        leftState.shift();
        leftState.push(1);
        leftLED(true);
    } else {
        leftState.shift();
        leftState.push(0);
        leftLED(false);
    }
    if (distanceRight > 0 && distanceRight < 20) {
        rightState.shift();
        rightState.push(1);
        rightLED(true);
    } else {
        rightState.shift();
        rightState.push(0);
        rightLED(false);
    }

    if (distanceLeft < 20) {
        if (checkHistory(rightState)) {
            swipe = 'left';
            console.log("Swipe Left...");
        }
    }
    else if (distanceRight < 20) {
        if (checkHistory(leftState)) {
            swipe = 'right';
            console.log("Swipe Right...");
        }
    }

    setTimeout(measureDistance,50);
}

function checkHistory(state) {
   var sum = state.reduce(function (a, b) {
      return a + b;
   }, 0);
   return (sum > 5); 
}
