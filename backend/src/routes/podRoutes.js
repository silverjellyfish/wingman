// Contributors: Lana, Michelle
// Time: 1 hours

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Pod = require("../models/Pod");
const Location = require("../models/Location");
const User = require("../models/User");
const Airport = require("../models/Airport");

// GET /pods → 200
// GET all pods
router.get("/all", async (req, res) => {
  try {
    const pods = await Pod.find()
      .populate("members.user")
      .populate("pickup_location")
      .populate("dropoff_location", "code");

    if (!pods || pods.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(pods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /pods/:id/join → 200
// POST join a pod
router.post("/:id/join", async (req, res) => {
  try {
    const pod = await Pod.findById(req.params.id).populate("members.user");
    
    if (!pod) {
      return res.status(404).json({ error: "Pod not found" });
    }

    if (pod.members.length >= pod.max_people) {
      return res.status(400).json({ error: "Pod is full" });
    }

    if (pod.locked) {
      return res.status(403).json({ error: "Pod is locked" });
    }
    if (pod.members.length >= pod.max_people) {
      return res.status(400).json({ error: "Pod is full" });
    }

    const {
      userId,
      flightCode,
      flightDate,
      origin,
      destination,
      dropoffAirportId,
      boardingTime,
      departureTime,
      arrivalTime,
      numCheckedInBags,
      numCarryOnBags,
    } = req.body;
    if (!userId || !flightCode || !flightDate || !destination) {
      return res.status(400).json({
        error:
          "Missing required member details (userId, flightCode, flightDate, destination)",
      });
    }

    const user = await User.findOne({ firebaseUid: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const alreadyMember = pod.members.some(
      (member) => member.user?.toString() === user._id.toString()
    );
    if (!alreadyMember) {
      pod.members.push({
        user: user._id,
        status: "pending",
        flightCode: flightCode,
        flightDate: flightDate,
        origin: origin || "N/A",
        destination: destination,
        boardingTime,
        departureTime,
        arrivalTime,
        numCheckedInBags: numCheckedInBags ? parseInt(numCheckedInBags) : 0,
        numCarryOnBags: numCarryOnBags ? parseInt(numCarryOnBags) : 0,
      });
      pod.num_members = pod.members.length;
      await pod.save();
    }

    res.status(200).json({ message: "Join request sent" });
  } catch (err) {
    console.error(err);
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

    const user = await User.findOne({ firebaseUid: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Remove user from pod
    pod.members = pod.members.filter(
      (member) => member.user.toString() !== user._id.toString()
    );
    pod.num_members = pod.members.length;

    // If pod is empty → delete it
    if (pod.members.length === 0) {
      console.log("Pod is empty, deleting pod");
      await Pod.findByIdAndDelete(pod._id);
      return res.status(200).json({
        message: "Left pod and pod deleted (no members remaining)",
        deleted: true,
      });
    }

    // Otherwise save the updated pod
    await pod.save();

    res.status(200).json({ message: "Left pod", deleted: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
    const userId = req.params.userId;

    const user = await User.findOne({ firebaseUid: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const pods = await Pod.find({ "members.user": user._id })
      .populate("pickup_location")
      .populate("dropoff_location", "code")
      .populate("members.user");

    // Calculate total luggage for each pod based on pod member data
    const podsWithLuggage = pods.map((pod) => {
      const podObj = pod.toObject();

      // Calculate totals from member luggage stored in the pod
      const totalCheckedBags = podObj.members.reduce((sum, member) => {
        return sum + (member.numCheckedBags || 0);
      }, 0);

      const totalCarryOnBags = podObj.members.reduce((sum, member) => {
        return sum + (member.numCarryOnBags || 1);
      }, 0);

      podObj.num_big_luggage = totalCheckedBags;
      podObj.num_small_luggage = totalCarryOnBags;

      return podObj;
    });

    res.status(200).json(podsWithLuggage);
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

// POST /pods → 201
// Create a new pod
// POST /pods → 201
router.post("/", async (req, res) => {
  try {
    const {
      pickup_time,
      pickupLocationId,
      dropoffLocationId,
      userId,
      max_people,
      flightCode,
      flightDate,
      origin,
      destination,
      boarding,
      launch,
      landing,
      airlineLogo,
      numCheckedInBags,
      numCarryOnBags,
    } = req.body;

    if (
      !pickup_time ||
      !pickupLocationId ||
      !dropoffLocationId ||
      !userId ||
      !flightCode ||
      !flightDate
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if pickup location exists (Location model)
    const pickupLocation = await Location.findById(pickupLocationId);
    if (!pickupLocation) {
      return res.status(400).json({ error: "Pickup Location not found" });
    }

    // Check if dropoff location exists (Airport model)
    const dropoffLocation = await Airport.findById(dropoffLocationId);
    if (!dropoffLocation) {
      return res.status(400).json({ error: "Dropoff Airport not found" });
    }

    const newPod = new Pod({
      pickup_time,
      pickup_location: pickupLocation._id,
      dropoff_location: dropoffLocation._id,
      num_members: 1,
      members: [
        {
          user: userId,
          status: "accepted",
          flightCode,
          flightDate,
          origin: origin || "N/A",
          destination: destination || "N/A",
          boardingTime: boarding,
          departureTime: launch,
          arrivalTime: landing,
          airlineLogo: airlineLogo || "",
          numCheckedInBags: numCheckedInBags ? parseInt(numCheckedInBags) : 0,
          numCarryOnBags: numCarryOnBags ? parseInt(numCarryOnBags) : 0,
        },
      ],
      max_people: max_people,
      locked: false,
    });

    await newPod.save();
    res.status(201).json(newPod);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
