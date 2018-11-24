const nodemailer = require('nodemailer');
const envVars = require('../config/envVars');

//Transporter used to connect to email account.
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: envVars.authEmail.email,
    pass: envVars.authEmail.password
  }
});

// Email to be sent when user is to be verified.
var confirmEmail = {
  from: envVars.authEmail.email,
  to: '',
  subject: 'Email Confirmation. (Do Not Reply)',
  html: envVars.defaultVerifyEmailHTML,
  verifyHash: String
};

//Email to be sent when user requests to reset their password.
var resetEmail = {
  from: envVars.authEmail.email,
  to: '',
  subject: 'Reset Password Link. (Do Not Reply)',
  html: envVars.defaultResetEmailHTML,
  resetHash: String
};

module.exports = {confirmEmail, resetEmail, transporter};