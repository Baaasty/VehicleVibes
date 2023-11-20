'use strict';
require('dotenv').config(); // Load environment variables from a .env file if present

module.exports = {
  secret: process.env.JWT_SECRET,
};
