const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification"); // Optional model

// GET /notifications?unread=true
router.get("/", async (req, res) => {
  try {
    const filter = req.query.unread === "true" ? { read: false } : {};
    const notes = await Notification.find(filter);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /notifications/:id/read
router.post("/:id/read", async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
