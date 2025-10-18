// Contributors: Lana, Michelle

const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// GET /notifications?unread=true
// GET notifications for a user, optionally filtering for unread
router.get("/", async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const filter = { user: userId };
    if (req.query.unread === "true") {
      filter.read = false;
    }

    const notes = await Notification.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /notifications/:id/read
// Mark a notification as read
router.post("/:id/read", async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const note = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { read: true },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Notification not found or unauthorized" });
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
