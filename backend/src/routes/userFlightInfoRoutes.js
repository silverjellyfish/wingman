// Contributors: Lana

const express = require("express");
const router = express.Router();
const UserFlightInfo = require("../models/UserFlightInfo");

// POST /user-flights – Link a user to a flight with role/luggage
router.post("/", async (req, res) => {
  try {
    const info = new UserFlightInfo(req.body);
    await info.save();
    res.status(201).json(info);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /user-flights/:id – Get a user’s flight info
router.get("/:id", async (req, res) => {
  try {
    const info = await UserFlightInfo.findById(req.params.id);
    if (!info) return res.status(404).json({ error: "User flight info not found" });
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
