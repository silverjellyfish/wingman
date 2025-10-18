// Contributors: Lana, Michelle
// Time: 0.5 hours

const express = require("express");
const router = express.Router();
const UserSpec = require("../models/UserSpec");

// POST /userspecs → 201
// Create a new UserSpec
router.post("/", async (req, res) => {
  try {
    const spec = new UserSpec(req.body);
    await spec.save();
    res.status(201).json(spec);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /userspecs/:id → 200
// Get a UserSpec by ID
router.get("/:id", async (req, res) => {
  try {
    const spec = await UserSpec.findById(req.params.id)
      .populate("user")
      .populate("flight")
      .populate("pickupLocation");
    if (!spec) return res.status(404).json({ error: "UserSpec not found" });
    res.json(spec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /userspecs/:id → 200
// Update a UserSpec by ID
router.get("/user/:userId", async (req, res) => {
  try {
    const spec = await UserSpec.findOne({ user: req.params.userId });
    if (!spec) return res.status(404).json({ error: "UserSpec not found" });
    res.json(spec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /userspecs/flight/:flightId → 200
// Get all UserSpecs for a specific flight
router.get("/flight/:flightId", async (req, res) => {
  try {
    const specs = await UserSpec.find({ flight: req.params.flightId });
    res.json(specs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /userspecs/:id → 200
// Update a UserSpec by ID
router.patch("/:id", async (req, res) => {
  try {
    const updated = await UserSpec.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "UserSpec not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /userspecs/:id → 204
// Delete a UserSpec by ID
router.delete("/:id", async (req, res) => {
  try {
    await UserSpec.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
