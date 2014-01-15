var db = require('../models');

exports.create = function(req, res) {
  db.Computer.create({
    name: req.body.name,
    isPowered: req.body.isPowered,
    isLoggedIn: req.body.isLoggedIn,
    memoryUsage: req.body.memoryUsage,
    remoteConnectionCount: req.body.remoteConnectionCount
  }).success(function(computer) {
    res.json(computer);
  }).error(function(err) {
    console.log(err);
    res.json('error');
  });
};