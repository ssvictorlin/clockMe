
/*
 * GET home page.
 */
var usonic = require('mmm-usonic');

exports.view = function(req, res){
   // setInterval(measureDistance, 100);
    res.render('index');
};


function measureDistance() {
    var sensorLeft = usonic.createSensor(24, 23, 450);
    var sensorRight = usonic.createSensor(22, 27, 450);
    var distanceLeft = sensorLeft();
    console.log("Left distance is " + distanceLeft);
    var distanceRight = sensorRight();
    console.log("Right distance is " + distanceRight);
}
    
