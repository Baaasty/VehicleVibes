"use strict";
require("dotenv").config(); // Load environment variables from a .env file if present

module.exports = {
  development: {
    username: process.env.DB_DEV_USERNAME || "root",
    password: process.env.DB_DEV_PASSWORD || null,
    database: process.env.DB_DEV_NAME || "vehiclevibes_dev",
    host: process.env.DB_DEV_HOST || "localhost",
    dialect: "mysql",
    pool: {
      max: parseInt(process.env.DB_DEV_POOL_MAX) || 5,
      min: parseInt(process.env.DB_DEV_POOL_MIN) || 0,
      acquire: parseInt(process.env.DB_DEV_POOL_ACQUIRE) || 30000,
      idle: parseInt(process.env.DB_DEV_POOL_IDLE) || 10000,
    },
  },
  test: {
    username: process.env.DB_TEST_USERNAME || "root",
    password: process.env.DB_TEST_PASSWORD || null,
    database: process.env.DB_TEST_NAME || "vehiclevibes_test",
    host: process.env.DB_TEST_HOST || "localhost",
    dialect: "mysql",
    pool: {
      max: parseInt(process.env.DB_TEST_POOL_MAX) || 5,
      min: parseInt(process.env.DB_TEST_POOL_MIN) || 0,
      acquire: parseInt(process.env.DB_TEST_POOL_ACQUIRE) || 30000,
      idle: parseInt(process.env.DB_TEST_POOL_IDLE) || 10000,
    },
  },
  production: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "vehiclevibes",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    pool: {
      max: parseInt(process.env.DB_POOL_MAX) || 5,
      min: parseInt(process.env.DB_POOL_MIN) || 0,
      acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
      idle: parseInt(process.env.DB_POOL_IDLE) || 10000,
    },
  },
};
