var db = require('../models')
 
exports.index = function(req, res){
  res.render('layout', {
    title: 'Express',
  })
}