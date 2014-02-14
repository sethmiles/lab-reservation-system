var db = require('../../config/sequelize');

exports.getReservation = function(req, res){
  var day_start = new Date(req.date);
  day_start.setHours(0, 0, 0, 0);
  
  var day_end = new Date(req.date);
  day_end.setHours(0, 0, 0, 0);
  day_end.setDate(day_end.getDate() + 1);

  db.Reservation.findAll({ 
    where: { 
      computerId: req.computer.id,
      start_time: {
        between: [day_start, day_end]
      }
    }
  })
  .complete(function(err, reservations) {
    return res.jsonp(reservations);
  });
};

// This is called every time :date is used in a URL
exports.getDate = function(req, res, next, date) {
  req.date = date;
  next();
};