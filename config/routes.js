var restful = require('sequelize-restful'),
    index   = require('../app/controllers/index'),
    auth    = require('./middlewares/auth'),
    db      = require('./sequelize');

exports.init = function(app, passport) {
  console.log('Initializing Routes...');

  // Angular Routes
  app.get('/', index.index);
  app.get('/reserve', index.index);
  app.get('/calendar', index.index);
  app.get('/policies', index.index);

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
    app.all('/api/*', auth.auth);
  }
  
  // Automatically add CRUD to models in db
  app.use(restful(db.sequelize, { endpoint: '/api' }));
};
