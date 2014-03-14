var path     = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 3000,
  modelsDir : rootPath + '/app/models',
  settings: {
    dayStart: 800,
    maxReservationLength: 4,
    maxHoursPerDay: 8,
  }
};
