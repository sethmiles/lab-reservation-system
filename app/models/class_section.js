module.exports = function(sequelize, DataTypes) {
  var ClassSection = sequelize.define('ClassSection', {
    section_num: DataTypes.INTEGER,
    class_num: DataTypes.INTEGER,
    title: DataTypes.STRING,
    timeslot: DataTypes.DATE,
    sunday: DataTypes.BOOLEAN,
    monday: DataTypes.BOOLEAN,
    tuesday: DataTypes.BOOLEAN,
    wednesday: DataTypes.BOOLEAN,
    thursday: DataTypes.BOOLEAN,
    friday: DataTypes.BOOLEAN,
    saturday: DataTypes.BOOLEAN,
  }, {
    associate: function(models) {
      ClassSection.hasOne(models.User, { as: "professor" });
      ClassSection.hasMany(models.User);
    }
  });
 
  return ClassSection;
};
