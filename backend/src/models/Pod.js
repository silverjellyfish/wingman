const mongoose = require("mongoose");

const podSchema = new mongoose.Schema({
    num_members: { type: Number, default: 0 },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pickup_time: { type: Date, required: true },
    location: {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true },
    },
    num_big_luggage: {type: Number, default: 0 },
    num_small_luggage: {type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

});

module.exports = mongoose.model("Pod", podSchema);