'use strict';
const config = require('../config/mail.config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: config.service,
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth: {
    user: config.auth.user,
    pass: config.auth.pass,
  },
});

module.exports = transporter;
