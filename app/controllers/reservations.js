var db = require('../../config/sequelize');

exports.getReservation = function(req, res){
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  
  var tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  db.Reservation.findAll({ 
    where: { 
      computerId: req.computer.id,
      start_time: {
        between: [today, tomorrow]
      }
    }
  })
  .complete(function(err, reservations) {
    return res.jsonp(reservations);
  });
};
