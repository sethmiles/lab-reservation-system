var db = require('../models');

exports.createUser = function(req, res) {
  db.user.create({
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

exports.findUser = function(req, res) {
  db.user.find({
    id: req.body.id
  }).success(function(user) {
    res.json(user);
  }).error(function(err) {
    console.log(err);
    res.json('error');
  });
};

exports.findAllUsers = function(req, res) {
  db.user.findAll().success(function(users) {
    res.json(users);
  }).error(function(err) {
    console.log(err);
    res.json('error');
  });
};

exports.updateUser = function(req, res) {
  res.json('update');
};

exports.deleteUser = function(req, res) {
  res.json('delete');
};
