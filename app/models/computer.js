module.exports = function(sequelize, DataTypes) {
  var Computer = sequelize.define('Computer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    isPowered: DataTypes.BOOLEAN,
    isLoggedIn: DataTypes.BOOLEAN,
    isReservable: DataTypes.BOOLEAN,
    memoryUsage: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    remoteConnectionCount: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    }
  }, {
    associate: function(models) {
      Computer.hasMany(models.Reservation);
    }
  });
 
  return Computer;
};
