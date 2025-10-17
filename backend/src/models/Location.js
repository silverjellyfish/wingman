// Contributors: Michelle

const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, enum: ["airport", "hotel", "landmark"], required: true },
    coordinates: {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true },
    },
});

module.exports = mongoose.model("Location", locationSchema);