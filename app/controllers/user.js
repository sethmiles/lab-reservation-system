var db = require('../models');

exports.create = function(req, res) {
  db.User.create({
    netId: req.body.netId,
    name: req.body.name,
    email: req.body.email,
    major: req.body.major,
    role: req.body.role
  }).success(function(user) {
    res.json(user);
  }).error(function(err) {
    console.log(err);
    res.json('error');
  });
};

exports.user = function(req, res) {
  db.User.find({
    id: req.body.id
  }).success(function(user) {
    res.json(user);
  }).error(function(err) {
    console.log(err);
    res.json('error');
  });
};

exports.all = function(req, res) {
  db.User.findAll().success(function(users) {
    res.json(users);
  }).error(function(err) {
    console.log(err);
    res.json('error');
  });
};

exports.update = function(req, res) {
  res.json('update');
};

exports.destroy = function(req, res) {
  res.json('delete');
};
