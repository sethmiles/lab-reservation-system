var restful = require('sequelize-restful'),
    index   = require('../app/controllers/index'),
    auth    = require('./middlewares/auth'),
    db      = require('./sequelize');

exports.init = function(app, passport) {
  console.log('Initializing Routes...');

  app.get('/', index.index);

  app.post('/login', passport.authenticate('ldapauth', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));
  app.post('/logout', function(req, res){ req.logOut(); res.send(200); });
  app.get('/loggedin', function(req, res) { res.send(req.isAuthenticated() ? req.user : '0'); });
  
  // REST API
  if ('production' === app.get('env')) {
    app.all('/api/*', auth.auth);
  }
  
  app.use(restful(db.sequelize, { endpoint: '/api' }));
  app.get('*', index.index);
};
