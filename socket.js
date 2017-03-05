var usonic = require('mmm-usonic');
var leftState = [0,0,0,0,0,0,0,0,0,0];
var rightState = [0,0,0,0,0,0,0,0,0,0];
var swipe = null;
module.exports = function (io) {
    
    setTimeout(measureDistance, 100);
    io.sockets.on('connection', function (socket) {
        console.log("sending message..."); 
        socket.emit('welcome', { message: 'Welcome!'});

        socket.on('req-swipe', function (data) {
            //console.log("receiving swipe req message..."); 
            if (swipe == 'left' ) {
                console.log("sending swipe message..."); 
                socket.emit('res-swipe', { message: 'left'});
            } else {
                //console.log("sending no swipe message..."); 
                socket.emit('res-swipe', { message: 'right'});
            }
        });
    }); 
};


function measureDistance() {
    var sensorLeft = usonic.createSensor(24, 23, 450);
    var sensorRight = usonic.createSensor(22, 27, 450);
    var distanceLeft = sensorLeft();
   // console.log("Left distance is " + distanceLeft);
    var distanceRight = sensorRight();
   // console.log("Right distance is " + distanceRight);
    //
    if (distanceLeft > 0 && distanceLeft < 20) {
        leftState.shift();
        leftState.push(1);
    } else {
        leftState.shift();
        leftState.push(0);
    }
    if (distanceRight > 0 && distanceRight < 20) {
        rightState.shift();
        rightState.push(1);
    } else {
        rightState.shift();
        rightState.push(0);
    }

    if (distanceLeft < 20) {
        if (checkHistory(rightState)) {
            swipe = 'left';
            console.log("Swipe Left...");
        }
    }
    else if (distanceRight < 20) {
        if (checkHistory(leftState)) {
            console.log("Swipe Right...");
        }
    }

    setTimeout(measureDistance, 50);
}

function checkHistory(state) {
   var sum = state.reduce(function (a, b) {
      return a + b;
   }, 0);
   return (sum > 6); 
}
