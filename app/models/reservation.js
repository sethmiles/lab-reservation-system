module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define('Reservation', {
    start_time: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    end_time: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    note: DataTypes.TEXT
  }, {
    associate: function(models) {
      Reservation.belongsTo(models.User);
      Reservation.belongsTo(models.Computer);
    }
  });
 
  return Reservation;
};
