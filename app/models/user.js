module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    netId: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'student'
    },
    gravatarHash: {
      type: DataTypes.STRING,
    }
  }, {
    associate: function(models) {
      User.hasMany(models.Reservation);
      User.hasMany(models.ClassSection);
    }
  });
 
  return User;
};
