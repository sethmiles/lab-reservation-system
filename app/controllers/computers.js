var db = require('../../config/sequelize');

// Find article by id. This is called every time :computerId is used in a URL
exports.computer = function(req, res, next, id) {
  db.Computer.find({ where: {id: id} }).success(function(computer){
    if(!computer) {
      return next(new Error('Failed to load computer ' + id));
    } else {
      req.computer = computer;
      return next();            
    }
  }).error(function(err){
    return next(err);
  });
};