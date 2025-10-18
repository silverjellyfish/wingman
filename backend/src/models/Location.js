// Contributors: Michelle
// Time: 0.5 hours

const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, enum: ["airport", "university", "hotel", "landmark"], required: true },
    coordinates: {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true },
    },
}, { timestamps: true });

locationSchema.index({ coordinates: "2dsphere" });
module.exports = mongoose.model("Location", locationSchema);