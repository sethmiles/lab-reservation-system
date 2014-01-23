var passport      = require('passport'),
    _             = require('lodash'),
    LocalStrategy = require('passport-local').Strategy,
    LdapStrategy = require('passport-ldapauth').Strategy,
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
        console.log('Login (local) : { id: ' + user.id + ', netId: ' + user.netId + ' }');
        done(null, user);
      }
    }).error(function(err){
      done(err);
    });
  }
));

passport.use(new LdapStrategy({
    server: {
      url: 'ldap://ldap.byu.edu:389',
      adminDn: 'uid={{username}},ou=People,o=byu.edu',
      adminPassword: '',
      searchBase: 'ou=People,o=byu.edu',
      searchFilter: '(uid={{username}})',
      usernameField: 'uid',
    }
  },
  function(user, done) {
    db.User.find({ where: { netId: user.uid }}).success(function(user) {
      if (!user) {
        done(null, false, { message: 'Unknown user' });
      } else {
        console.log('Login (local) : { id: ' + user.id + ', netId: ' + user.netId + ' }');
        done(null, user);
      }
    }).error(function(err){
      done(err);
    });
  }
));

module.exports = passport;
