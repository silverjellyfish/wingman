// Contributors: Michelle
// Time: 0.5 hours

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
