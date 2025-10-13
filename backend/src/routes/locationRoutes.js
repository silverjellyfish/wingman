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

module.exports = router;
