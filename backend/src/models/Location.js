// Contributors: Michelle
// Time: 0.5 hours
// TODO: ADD COORDINATES LATER

const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, enum: ["airport", "university", "hotel", "landmark"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("Location", locationSchema);