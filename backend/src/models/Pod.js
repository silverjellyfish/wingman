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
        flightCode: { type: String, required: true },
        flightDate: { type: Date, required: true },
        origin: { type: String },
        destination: { type: String },

        boardingTime: { type: String, required: true },
        departureTime: { type: String, required: true },
        arrivalTime: { type: String, required: true },
        airlineLogo: { type: String },
        numCheckedBags: { type: Number, default: 0 },
        numCarryOnBags: { type: Number, default: 1 },
      },
    ],
    max_people: { type: Number, required: true },
    locked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pod", podSchema);
