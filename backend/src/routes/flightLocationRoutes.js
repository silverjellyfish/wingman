const express = require("express");
const router = express.Router();
const FlightLocation = require("../models/FlightLocation");

// POST /flight-locations – Create a location for a flight
router.post("/", async (req, res) => {
  try {
    const location = new FlightLocation(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /flight-locations/:id – Retrieve a location
router.get("/:id", async (req, res) => {
  try {
    const location = await FlightLocation.findById(req.params.id);
    if (!location) return res.status(404).json({ error: "Flight location not found" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
