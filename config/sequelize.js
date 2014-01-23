var fs        = require('fs'),
    path      = require('path'),
    Sequelize = require('sequelize-mysql').sequelize,
    _         = require('lodash'),
    config    = require('./config'),
    db        = {};

console.log("Initializing Sequelize...");

var sequelize = new Sequelize(config.db.name, config.db.username, config.db.password);

fs
  .readdirSync(config.modelsDir)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(config.modelsDir, file));
    db[model.name] = model;
  });
 
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db);
  }
});
 
sequelize
  .sync({ force: true })
  .complete(function(err) {
    if (err) throw err;
    else console.log("Database dropped and synchronized");
  });

module.exports = _.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
