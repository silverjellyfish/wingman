// src/app.js
const express = require("express");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// middleware
app.use(express.json());

// register routes
app.use("/api", routes);

// error handler (last)
app.use(errorHandler);

module.exports = app;