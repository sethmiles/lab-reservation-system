var express = require('express'),
  controllers = require('./app/controllers'),
  user = require('./app/controllers/user'),
  computer = require('./app/controllers/computer'),
  http = require('http'),
  path = require('path'),
  db = require('./app/models');
 
var app = express();
 
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
 
// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}
 
app.get('/', controllers.index);

// User API
app.get('/users/:id', user.user);
app.get('/users', user.all);
app.post('/users', user.create);
app.put('/users/:id', user.update);
app.delete('/users/:id', user.destroy);
 
// Computer API
app.post('/computers', computer.create);


db
  .sequelize
  .sync({ force: true })
  .complete(function(err) {
    if (err) {
      throw err;
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
      });
    }
  });