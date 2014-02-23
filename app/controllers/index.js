exports.index = function(req, res){
  console.log(req.flash('error'));
  res.render('index', { 
    user: req.user ? JSON.stringify(req.user) : "null",
    message: req.flash('error')
  });
};
