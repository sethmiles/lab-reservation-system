module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    netId: { type: DataTypes.STRING, validate: { notNull: true } },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    major: DataTypes.STRING,
    role: DataTypes.STRING
  });
 
  return User;
};