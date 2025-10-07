const express = require("express");
const router = express.Router();
const UserSpec = require("../models/UserSpec");

router.post("/", async (req, res) => {
  try {
    const spec = new UserSpec(req.body);
    await spec.save();
    res.status(201).json(spec);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const spec = await UserSpec.findById(req.params.id);
    if (!spec) return res.status(404).json({ error: "UserSpec not found" });
    res.json(spec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updated = await UserSpec.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "UserSpec not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await UserSpec.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
