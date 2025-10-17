// Contributors: Michelle

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true, // optional, only if using cookies/auth headers
}));

app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
