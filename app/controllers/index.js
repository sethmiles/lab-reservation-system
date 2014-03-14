var config = require('../../config/config');

exports.index = function(req, res){
  console.log(config.settings);
  res.render('index', { 
    user: req.user ? JSON.stringify(req.user) : "null",
    settings: JSON.stringify(config.settings),
    message: req.flash('error'),
  });
};
