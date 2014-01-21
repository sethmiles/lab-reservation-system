var express  = require('express'),
    config   = require('./config/config'),
    db       = require('./config/sequelize'),
    passport = require('./config/passport');

var app = express();
 
//Initialize Express
require('./config/express')(app, passport);

//Initialize Routes
require('./config/routes').init(app, passport);

//Start the app
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);

//expose app
exports = module.exports = app;
