var restful      = require('sequelize-restful'),
    index        = require('../app/controllers/index'),
    computers    = require('../app/controllers/computers'),
    reservations = require('../app/controllers/reservations'),
    auth         = require('./middlewares/auth'),
    db           = require('./sequelize');

exports.init = function(app, passport) {
  console.log('Initializing Routes...');

  // Angular Routes
  app.get('/', index.index);
  app.get('/reserve', index.index);
  app.get('/calendar', index.index);
  app.get('/policies', index.index);

  // Admin Route
  app.get('/admin', auth.isAuthenticated, auth.isAdmin, index.index);
  app.get('/admin/*', auth.isAuthenticated, auth.isAdmin, index.index);

  // Use LDAP in production, insecure local authentication in development
  if ('production' === app.get('env')) {
    app.post('/login', passport.authenticate('ldapauth', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));
  } else {
    app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));
  }
  app.post('/logout', function(req, res){ req.logOut(); res.send(200); });
  app.get('/loggedin', function(req, res) { res.send(req.isAuthenticated() ? req.user : '0'); });
  
  // Secure REST API
  if ('production' === app.get('env')) {
    app.all('/api/*', auth.isAuthenticated);
  }
  
  // Automatically add CRUD to models in db
  app.use(restful(db.sequelize, { endpoint: '/api' }));
  app.get('/getReservation/:computerId', reservations.getReservation);

  // Finish with setting up the computerID param
  // Note: the computer.computer function will be called everytime then it will call the next function. 
  app.param('computerId', computers.computer);
};
