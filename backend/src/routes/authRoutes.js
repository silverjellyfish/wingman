const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /auth/register
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    // TODO: add real authentication logic
    res.status(200).json({ token: "fake-jwt-token" });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// POST /auth/token/refresh
router.post("/token/refresh", async (req, res) => {
  try {
    res.status(200).json({ token: "new-fake-token" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /auth/logout
router.post("/logout", async (req, res) => {
  try {
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
