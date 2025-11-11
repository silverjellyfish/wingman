// Contributors: Michelle
// Time: 0.1 hours

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://wingman-for-you.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
