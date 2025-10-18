// Contributors: Michelle

const express = require("express");
const router = express.Router();

// Sub-routes
const airportRoutes = require("./airportRoutes");
const flightRoutes = require("./flightRoutes");
const locationRoutes = require("./locationRoutes");
const notificationRoutes = require("./notificationRoutes");
const podRoutes = require("./podRoutes");
const userRoutes = require("./userRoutes");
const userSpecRoutes = require("./userSpecRoutes");

// Root API endpoint
router.get("/", (req, res) => {
  res.send("Welcome to the API root");
});

// Mount sub-routes
router.use("/airports", airportRoutes);
router.use("/flights", flightRoutes);
router.use("/locations", locationRoutes);
router.use("/notifications", notificationRoutes);
router.use("/pods", podRoutes);
router.use("/users", userRoutes);
router.use("/userSpecs", userSpecRoutes);

module.exports = router;
