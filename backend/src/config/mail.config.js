'use strict';
require('dotenv').config(); // Load environment variables from a .env file if present

module.exports = {
  service: process.env.MAIL_SERVICE || 'gmail',
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: process.env.MAIL_PORT || 587,
  secure: process.env.MAIL_SECURE || false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};
