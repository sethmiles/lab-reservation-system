module.exports = function(sequelize, DataTypes) {
  var ClassSection = sequelize.define('ClassSection', {
    section_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    class_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    timeslot: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    sunday: DataTypes.BOOLEAN,
    monday: DataTypes.BOOLEAN,
    tuesday: DataTypes.BOOLEAN,
    wednesday: DataTypes.BOOLEAN,
    thursday: DataTypes.BOOLEAN,
    friday: DataTypes.BOOLEAN,
    saturday: DataTypes.BOOLEAN,
  }, {
    associate: function(models) {
      ClassSection.belongsTo(models.User, { foreignKey: "ProfessorId" });
      ClassSection.hasMany(models.User);
    }
  });
 
  return ClassSection;
};
