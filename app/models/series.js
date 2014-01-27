module.exports = function(sequelize, DataTypes) {
  var Series = sequelize.define('Series', {
    name: DataTypes.STRING,
    endsOn: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    }
  }, {
    associate: function(models) {
      Series.hasMany(models.Reservation);
      Series.belongsTo(models.User);
    },
    freezeTableName: true
  });
 
  return Series;
};
