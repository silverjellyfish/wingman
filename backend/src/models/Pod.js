// Contributors: Michelle
// Time: 0.5 hours

const mongoose = require("mongoose");

/*
  Mongoose schema and model for Pod.
*/
const podSchema = new mongoose.Schema(
  {
    pickup_time: { type: Date, required: true },
    pickup_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    dropoff_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: true,
    },
    num_members: { type: Number, default: 0 },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
    ],
    // TODO: Change this to be num_big_luggage_leftover?
    num_big_luggage: { type: Number, default: 0 },
    num_small_luggage: { type: Number, default: 0 },
    locked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pod", podSchema);
