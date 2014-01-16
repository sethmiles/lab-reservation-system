module.exports = function(sequelize, DataTypes) {
  var Computer = sequelize.define('Computer', {
    name: DataTypes.STRING,
    isPowered: DataTypes.BOOLEAN,
    isLoggedIn: DataTypes.BOOLEAN,
    isReservable: DataTypes.BOOLEAN,
    memoryUsage: DataTypes.INTEGER,
    remoteConnectionCount: DataTypes.INTEGER
  }, {
    associate: function(models) {
      Computer.hasMany(models.Reservation);
      Computer.hasOne(models.Computer, {through: 'classsectionsusers'})
    }
  });
 
  return Computer;
};
