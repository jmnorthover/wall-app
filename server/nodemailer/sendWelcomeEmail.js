const nodemailer = require('nodemailer');
const { GMAIL_PW } = require('../config/keys');

// configuration for nodemailer
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jmnorthover@gmail.com',
    pass: GMAIL_PW,
  },
});

// takes in user info and sends welcome e-mail
const sendWelcomeEmail = async (userEmail, username) => {
  const mailOptions = {
    from: 'jmnorthover@gmail.com',
    to: userEmail,
    subject: 'Welcome to Wall App',
    text: `Greetings ${username}, thanks for joining Wall App!`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendWelcomeEmail;
