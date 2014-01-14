var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  computer = require('./routes/computer')
  http = require('http'),
  path = require('path'),
  db = require('./models');
 
var app = express()
 
// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))
 
// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}
 
app.get('/', routes.index)

// User API
app.get('/users/:id', user.findUser)
app.get('/users', user.findAllUsers)
app.post('/users', user.createUser)
app.put('/users/:id', user.updateUser)
app.delete('/users/:id', user.deleteUser)
 
// Computer API
app.post('/computers', computer.createComputer)


db
  .sequelize
  .sync({ force: true })
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })