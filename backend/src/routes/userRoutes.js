// Contributors: Michelle
// Time: 0.5 hours

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Pod = require("../models/Pod");

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

router.get("/mongoid/:firebaseUid", async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid});
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user._id);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/users/profile/:firebaseUid
// Update user profile by Firebase UID
router.patch("/profile/:firebaseUid", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid: req.params.firebaseUid },
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/users/avatar/:firebaseUid
// Update user avatar by Firebase UID
router.patch("/avatar/:firebaseUid", async (req, res) => {
  try {
    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({ error: "Avatar data is required" });
    }

    // Validate that it's a base64 image
    if (!avatar.startsWith('data:image/')) {
      return res.status(400).json({ error: "Invalid image format" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid: req.params.firebaseUid },
      { avatar },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Avatar updated successfully", avatar: updatedUser.avatar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/users/profile/:firebaseUid
// Delete user profile by Firebase UID
router.delete("/firebase/:firebaseUid", async (req, res) => {
  try {
    const { firebaseUid } = req.params;

    const user = await User.findOne({ firebaseUid: firebaseUid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userMongooseId = user._id;

    await Pod.updateMany(
      { "members.user": userMongooseId },
      { $pull: { members: { user: userMongooseId } }, $inc: { num_members: -1 } }
    );

    await Pod.deleteMany({ num_members: { $lte: 0 } });

    const deleted = await User.findOneAndDelete({
      firebaseUid: firebaseUid,
    });

    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User and associated pod memberships deleted" });
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
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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

// GET /api/users/check-email?email=example@vanderbilt.edu
router.get("/check-email", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ error: "Email query parameter is required" });
    }

    const exists = await User.exists({ email: email.toString() });

    res.json({ exists: !!exists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
