// Contributors: Lana, Michelle
// Time: 0.5 hours

const express = require("express");
const router = express.Router();
const Airport = require("../models/Airport");

// GET /api/airports
// Retrieve a list of airports, optionally filtered by search query
router.get("/", async (req, res) => {
  try {
    const query = req.query.search;
    const filter = query
      ? {
          $or: [
            { name: new RegExp(query, "i") },
            { code: new RegExp(query, "i") },
          ],
        }
      : {};
    const results = await Airport.find(filter);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AirportRoutes.js - POST /api/airports/ensure
// NOTE: You must have imported the Airport model at the top of this file.

// POST /api/airports/ensure → 200 or 201
// Ensures an airport exists based on its code/name.
router.post("/ensure", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Missing required field: code" });
    }

    // Try to find existing
    let airport = await Airport.findOne({ code });

    if (!airport) {
      airport = new Airport({ code });
      await airport.save();
    }

    res.json(airport);
  } catch (err) {
    console.error("ERROR in /airports/ensure:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
