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

  //routes should be at the last
  app.use(app.router);
};
