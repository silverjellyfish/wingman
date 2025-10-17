// Contributors: Michelle

const express = require("express");
const router = express.Router();

// Sub-routes
const airportRoutes = require("./airportRoutes");
const authRoutes = require("./authRoutes");
const flightRoutes = require("./flightRoutes");
const locationRoutes = require("./locationRoutes");
const matchRoutes = require("./matchRoutes");
const notificationRoutes = require("./notificationRoutes");
const podRoutes = require("./podRoutes");
const userFlightInfoRoutes = require("./userFlightInfoRoutes");
const userRoutes = require("./userRoutes");
const userSpecRoutes = require("./userSpecRoutes");

// Root API endpoint
router.get("/", (req, res) => {
  res.send("Welcome to the API root");
});

// Mount sub-routes
router.use("/airports", airportRoutes);
router.use("/auth", authRoutes);
router.use("/flights", flightRoutes);
router.use("/locations", locationRoutes);
router.use("/matches", matchRoutes);
router.use("/notifications", notificationRoutes);
router.use("/pods", podRoutes);
// router.use("/userFlightInfos", userFlightInfoRoutes);
router.use("/users", userRoutes);
router.use("/userSpecs", userSpecRoutes);

module.exports = router;
