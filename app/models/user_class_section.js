module.exports = function(sequelize, DataTypes) {
  var UserClassSection = sequelize.define('UserClassSection', {}, {
    associate: function(models) {
      UserClassSection.hasOne(models.Computer);
      UserClassSection.hasOne(models.User);
      UserClassSection.hasOne(models.ClassSection);
    }
  });
 
  return UserClassSection;
};
