// Contributors: Michelle
// Time: 0.5 hours

const mongoose = require("mongoose");

/*
  Mongoose schema and model for UserSpec.
*/
const userSpecSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    earliestArrivalTime: { type: Date, required: true },
    latestArrivalTime: { type: Date, required: true },
    pickupLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    numLargeLuggage: { type: Number, default: 0 },
    numSmallLuggage: { type: Number, default: 0 },
    genderPreference: { type: String, enum: ["male", "female", "other"] },
  },
  { timestamps: true }
);

userSpecSchema.index({ user: 1 });
userSpecSchema.index({ flight: 1 });

module.exports = mongoose.model("UserSpec", userSpecSchema);
