var express = require('express'),
    config  = require('./config'),
    flash   = require('connect-flash');

module.exports = function(app, passport) {
  console.log('Initializing Express...');

  // all environments
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(config.root + '/public'));

  // development only
  if ('development' === app.get('env')) {
    app.use(express.errorHandler());
  }

  //cookieParser should be above session
  app.use(express.cookieParser());

  // request body parsing middleware should be above methodOverride
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.methodOverride());

  //express/mongo session storage
  app.use(express.session({ secret: '$uper$ecret$e$$ionKey'}));

  //connect flash for flash messages
  app.use(flash());

  //use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // have settings
  app.set('settings', config.settings);

  // This stuff is messing up the production server flag
/*  // Handle 401
  app.use(function(req, res) {
    res.status(401);
    res.render('errors/401.jade', {title: '401: Unauthorized'});
  });

  // Handle 404
  app.use(function(req, res) {
    res.status(404);
    res.render('errors/404.jade', {title: '404: File Not Found'});
  });
  
  // Handle 500
  app.use(function(error, req, res, next) {
    res.status(500);
    res.render('errors/500.jade', {title:'500: Internal Server Error', error: error});
  });*/

  //routes should be at the last
  app.use(app.router);
};
