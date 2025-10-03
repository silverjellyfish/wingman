const mongoose = require("mongoose");

// TODO: DEFINE BETTER

const userSpecSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
    earliestArrivalTime: { type: Datetime, required: true },
    latestArrivalTime: { type: Datetime, required: true },
    pickupLocation: {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true },
    },
    numLargeLuggage: { type: Number, default: 0 },
    numSmallLuggage: { type: Number, default: 0 },
    genderPreference: { type: String, enum: ["male", "female", "other"] },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserSpec", userSpecSchema);