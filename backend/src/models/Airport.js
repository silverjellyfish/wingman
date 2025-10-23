// Contributors: Michelle
// Time: 0.5 hours

const mongoose = require("mongoose");

/*
  Mongoose schema and model for Airport.
*/
const airportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Airport", airportSchema);