const mongoose = require("mongoose");

// TODO: DEFINE BETTER

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  university: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  emergencyContact: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);