var passport      = require('passport'),
    _             = require('lodash'),
    LocalStrategy = require('passport-local').Strategy,
    db            = require('./sequelize');

console.log('Initializing Passport...');

//Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.User.find({where: {id: id}}).success(function(user){
        console.log('Session: { id: ' + user.id + ', username: ' + user.username + ' }');
        done(null, user);
    }).error(function(err){
        done(err, null);
    });
});

//Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'netId',
    passwordField: 'password'
  },
  function(netId, password, done) {
    db.User.find({ where: { netId: netId }}).success(function(user) {
      if (!user) {
        done(null, false, { message: 'Unknown user' });
      } else {
        console.log('Login (local) : { id: ' + user.id + ', username: ' + user.username + ' }');
        done(null, user);
      }
    }).error(function(err){
      done(err);
    });
  }
));

module.exports = passport;
