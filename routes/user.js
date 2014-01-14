var db = require('../models')

exports.create = function(req, res) {
  
  var user = db.User.build({
    nedId: 'john122',
    name: 'john',
    email: 'bobobo@bob.com',
    major: 'IS',
    role: 'student'
  });
 
  user
    .save()
    .complete(function(err) {
      if (!!err) {
        console.log('The instance has not been saved:', err)
      } else {
        res.json(user)
        console.log('We have a persisted instance now')
      }
    })
};

exports.find = function(req, res) {
  db.User.find({
    id: req.params.user_id
  }).complete(function(err, user) {
    if (!!err) {
      console.log('An error occurred while searching for John:', err)
    } else if (!user) {
      console.log('No user with the username "john-doe" has been found.')
    } else {
      res.json(user);
    }
  });
};

exports.findAll = function(req, res) {
  db.User.findAll().success(function(users) {
    res.json(users);
  })
};
