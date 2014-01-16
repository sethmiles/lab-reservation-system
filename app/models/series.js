module.exports = function(sequelize, DataTypes) {
  var Series = sequelize.define('Series', {
    name: DataTypes.STRING,
    endsOn: DataTypes.DATE
  }, {
    associate: function(models) {
      Series.hasMany(models.Reservation);
      Series.hasOne(models.User);
    } ,
    freezeTableName: true
  });
 
  return Series;
};
