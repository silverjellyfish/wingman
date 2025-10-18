// Contributors: Michelle

const mongoose = require("mongoose");

/*  
  Mongoose schema and model for User.
*/
const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    phone: { type: String },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    emergencyContact: { type: String },
    activeFlights: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flight" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
