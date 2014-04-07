var nodemailer = require('nodemailer');

exports.sendEmail = function(to, subject, text) {
  // create reusable transport method (opens pool of SMTP connections)
  var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: 'byu.lab.reservation.system',
      pass: 'TheLabReservationSystem!'
    }
  });

  var mailOptions = {
    from: 'byu.lab.reservation.system@gmail.com',
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