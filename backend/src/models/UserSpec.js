const mongoose = require("mongoose");

// TODO: DEFINE BETTER

const userSpecSchema = new mongoose.Schema({
    genderPreference: { type: String, enum: ["male", "female", "other"] },
    numLargeLuggage: { type: Number, default: 0 },
    numSmallLuggage: { type: Number, default: 0 },
    university: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserSpec", userSpecSchema);