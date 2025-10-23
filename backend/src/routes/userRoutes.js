// Contributors: Michelle
// Time: 0.5 hours

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// --- Firebase-based routes ---
// POST /api/users/profile
// Create or update user profile based on Firebase UID
router.post("/profile", async (req, res) => {
  const { firebaseUid, ...profileData } = req.body;
  try {
    let user = await User.findOne({ firebaseUid });
    if (!user) {
      user = new User({ firebaseUid, ...profileData });
    } else {
      Object.assign(user, profileData);
    }
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/users/profile/:firebaseUid
// Retrieve user profile by Firebase UID
router.get("/profile/:firebaseUid", async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/users/profile/:firebaseUid
// Delete user profile by Firebase UID
router.delete("/firebase/:firebaseUid", async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ firebaseUid: req.params.firebaseUid });
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Standard CRUD routes ---
// GET all users
// Retrive a list of all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new user
// Create a new user account
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/users/:id
// Update user settings / details
router.patch("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/users/:id
// Delete user account by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;