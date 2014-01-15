module.exports = function(sequelize, DataTypes) {
  var Computer = sequelize.define('Computer', {
    name: DataTypes.STRING,
    isPowered: DataTypes.BOOLEAN,
    isLoggedIn: DataTypes.BOOLEAN,
    memoryUsage: DataTypes.INTEGER,
    remoteConnectionCount: DataTypes.INTEGER
    //users_class_section_id integer REFERENCES users_class_sections
  });
 
  return Computer;
};
