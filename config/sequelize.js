var fs        = require('fs'),
    path      = require('path'),
    Sequelize = require('sequelize-mysql').sequelize,
    _         = require('lodash'),
    config    = require('./config'),
    db        = {};

console.log("Initializing Sequelize...");

var sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect
});

// Get all database models
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
 
// Start database
sequelize
  .sync({ force: config.db.force })
  .complete(function(err) {
    if (err) throw err;
    else console.log('Initializing database... Database dropped: ' + config.db.force);
  });

module.exports = _.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
