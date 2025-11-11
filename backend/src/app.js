// app.js
// Contributors: Michelle
// Time: 0.1 hours

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// List of allowed origins (local dev + your Vercel frontend(s))
const allowedOrigins = [
  "http://localhost:5173",
  "https://wingman-for-you.vercel.app",
  "https://wingman-git-deploy-m1chelle7s-projects.vercel.app",
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
      if (!origin) return callback(null, true);

      // Check if the incoming origin is in the whitelist
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true, // allow cookies or Authorization headers
  })
);

// Middleware
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
