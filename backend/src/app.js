// app.js
// Contributors: Michelle
// Time: 0.1 hours

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// List of allowed origins (local dev + your Vercel frontend(s))
// ADD http://localhost:5173/api to list if want test
// const allowedOrigins = [
//   "https://wingman-for-you.vercel.app",
//   "https://wingman-git-deploy-m1chelle7s-projects.vercel.app",
//   "http://localhost:5173/api",
// ];

// // CORS configuration
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("Not allowed by CORS"), false);
//       }
//     },
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middleware
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
