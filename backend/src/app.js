const express = require("express");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// JSON middleware
app.use(express.json());

// Mount routes
app.use("/api/users", userRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;