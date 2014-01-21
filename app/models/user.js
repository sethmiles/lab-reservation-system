module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    netId: { type: DataTypes.STRING, validate: { notNull: true } },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    major: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    associate: function(models) {
      User.hasMany(models.Reservation);
      User.hasMany(models.Series);
      User.hasMany(models.ClassSection);
    }
  });
 
  return User;
};