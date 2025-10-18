// Contributors: Lana

const express = require("express");
const router = express.Router();
const Pod = require("../models/Pod");

// GET /pods/:id → 200
// GET details about a specific pod
router.get("/:id", async (req, res) => {
  try {
    const pod = await Pod.findById(req.params.id)
      .populate("members")
      .populate("location");
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
    const pod = await Pod.findById(req.param.id);
    if (!pod) return res.status(404).json({ error: "Pod not found" });
    if (pod.locked) return res.status(403).json({ error: "Pod is locked" });

    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const alreadyMember = pod.members.some(
      (member) => member.user.toString() === userId
    );

    if (!alreadyMember) {
      pod.members.push({ user: userId, status: "pending" });
      pod.num_members = pod.members.length;
      await pod.save();
    }

    res.status(200).json({ message: "Join request sent" });
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

    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    pod.members = pod.members.filter(
      (member) => member.user.toString() !== userId
    );
    pod.num_members = pod.members.length;
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
    const pod = await Pod.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pod) return res.status(404).json({ error: "Pod not found" });
    res.status(200).json(pod);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /pods/user/:userId → 200
// GET pods for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const pods = await Pod.find({ "members.user": req.params.userId }).populate(
      "location"
    );
    res.status(200).json(pods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /pods/:podId/members/:userId → 200
// PATCH update member status in pod (accept/reject)
router.patch("/:podId/members/:userId", async (req, res) => {
  try {
    const { podId, userId } = req.params;
    const { status } = req.body;

    const pod = await Pod.findById(podId);
    if (!pod) return res.status(404).json({ error: "Pod not found" });

    const member = pod.members.find((m) => m.user.toString() === userId);
    if (!member) return res.status(404).json({ error: "User not in pod" });

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    member.status = status;
    await pod.save();

    res.status(200).json({ message: `User ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
