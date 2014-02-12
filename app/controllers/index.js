exports.index = function(req, res){
  res.render('index', { 
    user: req.user ? JSON.stringify(req.user) : "null",
    message: req.flash('error')
  });
};
