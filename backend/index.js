"use strict";
const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const app = express();

// cors middleware
app.use(cors());

// parse requests of content-type - application/json, application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/test.routes")(app);

// set port, listen for requests
const PORT = parseInt(process.env.PORT) || 8080;
app.listen({ port: PORT }, async () => {
  console.log("─".repeat(54));
  console.log();
  console.log(" ▐▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▌");
  console.log(" ▐ ░█░█░█▀▀░█░█░▀█▀░█▀▀░█░░░█▀▀░█░█░▀█▀░█▀▄░█▀▀░█▀▀ ▌");
  console.log(" ▐ ░▀▄▀░█▀▀░█▀█░░█░░█░░░█░░░█▀▀░▀▄▀░░█░░█▀▄░█▀▀░▀▀█ ▌");
  console.log(" ▐ ░░▀░░▀▀▀░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀▀░░▀▀▀░▀▀▀ ▌");
  console.log(" ▐▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌");
  console.log();
  console.log(`    Server is running on 'http://localhost:${PORT}/'.`);
  console.log();
  console.log("─".repeat(54));

  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  initial();
});

async function initial() {
  for (const ROLE of db.ROLES) {
    await db.Role.findOrCreate({
      where: {
        name: ROLE,
      },
    });
  }

  console.log("Initial finished!");
}
