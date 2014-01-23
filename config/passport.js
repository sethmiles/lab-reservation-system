var passport     = require('passport'),
    LdapStrategy = require('passport-ldapauth').Strategy,
    db           = require('./sequelize');

console.log('Initializing Passport...');

//Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.find({where: {id: id}}).success(function(user){
    console.log('Session: { id: ' + user.id + ', netId: ' + user.netId + ' }');
    done(null, user);
  }).error(function(err){
    done(err, null);
  });
});

//LDAP Login
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
    db.User.findOrCreate({ netId: user.uid }, { name: user.displayName, email: user.mail, role: 'student' }).success(function(user) {
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
