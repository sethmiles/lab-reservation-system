module.exports = function(sequelize, DataTypes) {
  var computer = sequelize.define('computer', {
    name: DataTypes.STRING,
    isPowered: DataTypes.BOOLEAN,
    isLoggedIn: DataTypes.BOOLEAN,
    memoryUsage: DataTypes.INTEGER,
    remoteConnectionCount: DataTypes.INTEGER
    //users_class_section_id integer REFERENCES users_class_sections
  });
 
  return computer;
};
