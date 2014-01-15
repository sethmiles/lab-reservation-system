module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define('Reservation', {
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    note: DataTypes.TEXT
  }, {
    associate: function(models) {
      Reservation.hasOne(models.User);
      Reservation.hasOne(models.Computer);
      Reservation.hasOne(models.Series);
    }
  });
 
  return Reservation;
};
