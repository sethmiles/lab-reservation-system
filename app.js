//Set up the Node environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Pull in needed modules
var express  = require('express'),
    config   = require('./config/config'),
    passport = require('./config/passport');

var app = express();
 
//Initialize Express
require('./config/express')(app, passport);

//Initialize Routes
require('./config/routes').init(app, passport);

//Start the app
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Initializing Express on port ' + port + '...');

//expose app
exports = module.exports = app;
