// Contributors: Michelle

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true }, // <--- new
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  university: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  emergencyContact: { type: String },
  activeFlights: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flight" }],
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("User", userSchema);