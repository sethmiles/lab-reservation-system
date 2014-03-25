var nodemailer = require('nodemailer'),
    db         = require('./sequelize');

exports.init = function() {
  var CronJob = require('cron').CronJob;
  // Send out reminder emails every 30 minutes, from 9 to 8
  //'0,30 09-20 * * *'
  var job = new CronJob({
    cronTime: '* * * * *',
    onTick: function() {
      var beginning = new Date();
      beginning.setMinutes(beginning.getMinutes() + 30);
      var ending = new Date();
      ending.setMinutes(beginning.getMinutes() + 30);
      // Get all reservations starting in an hour
      db.Reservation.findAll({
        where: {
          start_time: {
            gt: beginning,
            lt: ending
          }
        },
        include: [db.User]
      }).success(function(reservations) {
        for(var i = 0; i < reservations.length; i++) {
          var user = reservations[i].user;
          sendEmail(user.email, 'Reservation Reminder', 'Just wanted to remind you of your lab reservation at ' + reservations[i].start_time + ' until ' + reservations[i].end_time);
        }
      });
    },
    start: true
  });
};

var sendEmail = function(to, subject, text) {
  // create reusable transport method (opens pool of SMTP connections)
  var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: 'me@lanesawyer.com',
      pass: 'secret...'
    }
  });

  var mailOptions = {
    from: 'lrs@byu.edu',
    to: to,
    subject: subject,
    text: text
  };

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if(error) {
      console.log(error);
    } else {
      console.log('Message sent: ' + response.message);
    }
  });
};

exports.sendEmail = sendEmail;