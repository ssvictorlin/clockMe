
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var usonic = require('mmm-usonic');
var gpio = require('mmm-gpio');
var index = require('./routes/index');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
// view engine setup
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('CSE237A'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

gpio.init(function (error) {
    if (error) {
         console.log("Error init gpio...");
    } else {
         console.log("Successful init gpio...");
    }
});
usonic.init(function (error) {
    if (error) {
         console.log("Error init usonic...");
    } else {
         console.log("Successful init usonic...");
    }
});
// Add routes here
app.get('/', index.view);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var io = require('socket.io')(server);
require('./socket')(io);


server.listen(3000);


