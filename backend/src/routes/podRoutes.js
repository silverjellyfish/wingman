// Contributors: Lana

const express = require("express");
const router = express.Router();
const Pod = require("../models/Pod");

// GET /pods/:id → 200  
// GET details about a specific pod
router.get("/:id", async (req, res) => {
    try {
      const pod = await Pod.findById(req.params.id);
      if (!pod) return res.status(404).json({ error: "Pod not found" });
      res.status(200).json(pod);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// POST /pods/:id/join → 200
// POST join a pod
router.post("/:id/join", async (req, res) => {
    try {
        const pod = await Pod.findById(reqs.param.id);
        if (!pod) return res.status(404).json({ error: "Pod not found" });
        if (pod.locked) return res.status(403).json({ error: "Pod is locked" });

        const userId = req.body.userId;
        if (!userId) return res.status(400).json({ error: "Missing userId" });

        if (!pod.members.includes(userId)) {
        pod.members.push(userId);
        await pod.save();
    }

    res.status(200).json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// POST /pods/:id/leave → 200
// POST leave a pod
router.post("/:id/leave", async (req, res) => {
    try {
      const pod = await Pod.findById(req.params.id);
      if (!pod) return res.status(404).json({ error: "Pod not found" });
  
      const userId = req.body.userId;
      if (!userId) return res.status(400).json({ error: "Missing userId" });
  
      pod.members = pod.members.filter(id => id.toString() !== userId);
      await pod.save();
  
      res.status(200).json({ message: "Left pod" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// POST /pods/:id/lock → 200
// POST finalize pod 
router.post("/:id/lock", async (req, res) => {
    try {
      const pod = await Pod.findById(req.params.id);
      if (!pod) return res.status(404).json({ error: "Pod not found" });
  
      pod.locked = true;
      await pod.save();
  
      res.status(200).json({ message: "Pod locked" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// PATCH /pods/:id
// PATCH change pod details
router.patch("/:id", async (req, res) => {
    try {
      const pod = await Pod.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!pod) return res.status(404).json({ error: "Pod not found" });
      res.status(200).json(pod);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;
