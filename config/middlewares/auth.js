exports.isAuthenticated = function(req, res, next) { 
  if(!req.isAuthenticated()) {
    res.send(401);
  } else {
    next(); 
  }
};

exports.isAdmin = function(req, res, next) {
  if(req.user.role != 'admin') {
    res.send(401);
  } else {
    next();
  }
};