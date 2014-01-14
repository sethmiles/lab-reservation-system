module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    nedId: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    major: DataTypes.STRING,
    role: DataTypes.STRING
  });
 
  return User;
}