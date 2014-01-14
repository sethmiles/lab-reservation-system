module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    netId: { type: DataTypes.STRING, validate: { notNull: true } },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    major: DataTypes.STRING,
    role: DataTypes.STRING
  });
 
  return user;
};