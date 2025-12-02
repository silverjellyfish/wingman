// app.js
// Contributors: Michelle
// Time: 0.1 hours

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// STEPS FOR LOCAL TESTING
// COMMENT THE FOLLOWING OUT
/////////////////////////////////////////////////// BELOW THIS POINT
const allowedOrigins = [
   "https://wingman-for-you.vercel.app",
   "https://wingman-git-deploy-m1chelle7s-projects.vercel.app",
];

app.use(
   cors({
      origin: function (origin, callback) {
         if (!origin) return callback(null, true);

         if (allowedOrigins.includes(origin)) {
            return callback(null, true);
         } else {
            return callback(new Error("Not allowed by CORS"), false);
         }
      },
      credentials: true,
   })
);

/////////////////////////////////////////////////// ABOVE THIS POINT

// AND UNCOMMENT THE FOLLOWING:
// app.use(
//    cors({
//       origin: "http://localhost:5173",
//    })
// );
///////////////////////////////////////////////////

// Middleware
app.use(express.json({ limit: "10mb" })); // Increase limit for base64 images
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
