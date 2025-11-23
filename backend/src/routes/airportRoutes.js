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
    const { code, name, city, country, address } = req.body;

    if (!code || !name) {
      return res.status(400).json({ error: "Missing required fields (code and name)" });
    }

    // 1. Check if airport already exists by code
    let airport = await Airport.findOne({ code: code });

    if (airport) {
      // Found existing airport
      return res.status(200).json(airport);
    }

    // 2. If not found, create the new airport
    airport = new Airport({
      code: code,
      name: name,
      city: city || "Unknown",
      country: country || "Unknown",
      address: address || "N/A",
    });

    await airport.save();
    res.status(201).json(airport); // Respond with 201 for new creation
  } catch (err) {
    // Handle potential duplicate code errors or other database issues
    if (err.code === 11000) { // MongoDB duplicate key error
       return res.status(409).json({ error: "Airport code already exists but was not found via findOne." });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
