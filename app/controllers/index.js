var config = require('../../config/config'),
    email  = require('../../config/email');

exports.index = function(req, res) {
  res.render('index', { 
    user: req.user ? JSON.stringify(req.user) : "null",
    settings: JSON.stringify(config.settings),
    message: req.flash('error'),
  });
};

exports.sendWelcomeEmail = function(req, res) {
  email.sendEmail(req.body.email, 'Welcome to the Lab Reservation System', req.body.name + ', \nWelcome to the Lab Reservation System!');
};