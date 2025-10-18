// Contributors: Lana, Michelle

const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");

// GET /flights/:id → 200
// GET details about a specific flight
router.get("/:id", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id)
      .populate("origin")
      .populate("destination")
      .populate("user");
    if (!flight) return res.status(404).json({ error: "Flight not found" });
    res.status(200).json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /flights -> 201
// POST create a new flight
router.post("/", async (req, res) => {
    try {
      const flight = new Flight(req.body);
      await flight.save();
      res.status(201).json(flight);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// PATCH /flights/:id → 200
// PATCH update flight info
router.patch("/:id", async (req, res) => {
  try {
      const updatedFlight = await Flight.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
      );
      if (!updatedFlight) return res.status(404).json({ error: "Flight not found" });
      res.status(200).json(updatedFlight);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

// DELETE /flights/:id → 204
// DELETE remove a flight
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Flight.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Flight not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
