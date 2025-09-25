const express = require("express");
const router = express.Router();

// sub-routes
const userRoutes = require("./userRoutes");

// API route
router.get("/", (req, res) => {
  res.send("Welcome to the API root");
});

// sub-routes
router.use("/users", userRoutes);

module.exports = router;
