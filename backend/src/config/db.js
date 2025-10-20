// Contributors: Michelle
// Time: 0.5 hours

const mongoose = require("mongoose");

/* 
  Connect to MongoDB using Mongoose.
  The MongoDB URI is expected to be in the environment variable MONGO_URI.
*/
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
