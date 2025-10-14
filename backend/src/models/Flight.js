// Contributors: Michelle

const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true },
    airline: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Flight", flightSchema);