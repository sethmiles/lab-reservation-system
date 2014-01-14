var db = require('../models');

exports.createComputer = function(req, res) {
  db.computer.create({
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