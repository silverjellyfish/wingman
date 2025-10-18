// Contributors: Lana, Michelle

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

module.exports = router;
