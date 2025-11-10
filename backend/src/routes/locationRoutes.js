// Contributors: Lana
// Time: 0.5 hours
// TODO: Remove POST requests since locations are preset
const express = require("express");
const router = express.Router();
const Location = require("../models/Location");

router.get("/", async (req, res) => {
  try {
    const query = req.query.search;
    const filter = query ? { name: new RegExp(query, "i") } : {};
    const results = await Location.find(filter);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, address, type } = req.body;

    // Validate required fields
    if (!name || !address || !type) {
      return res.status(400).json({
        error: "Missing required fields: name, address, and type",
      });
    }

    // Validate type enum
    const allowedTypes = ["airport", "university", "hotel", "landmark"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        error: `Invalid type. Must be one of: ${allowedTypes.join(", ")}`,
      });
    }

    // Create and save new location
    const newLocation = new Location({ name, address, type });
    await newLocation.save();

    res.status(201).json(newLocation);
  } catch (err) {
    console.error("Error creating location:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
