const express = require("express");
const router = express.Router();

// POST /match-runs
router.post("/", async (req, res) => {
  try {
    res.status(202).json({ runId: "mock-run-id" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /match-runs/:runId
router.get("/:runId", async (req, res) => {
  try {
    res.json({ status: "in_progress", podId: null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /match-runs/:runId/accept
router.post("/:runId/accept", async (req, res) => {
  try {
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
