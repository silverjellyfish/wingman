// Contributors: Michelle
// Time: 0.5 hours

const mongoose = require("mongoose");

/*
  Mongoose schema and model for Airport.
*/
const airportSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Airport", airportSchema);
