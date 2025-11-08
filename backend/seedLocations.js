// seedLocations.js
// Run this script once to populate the Location collection with preset data

require("dotenv").config(); // ✅ allows you to load MONGODB_URI from .env
const mongoose = require("mongoose");
const Location = require("./src/models/Location");

// Use your real connection string (auto-read from .env)
const MONGODB_URI = process.env.MONGO_URI;

const locations = [
  {
    name: "Buttrick Hall",
    address: "350 Buttrick Hall, Vanderbilt University, Nashville, TN 37235",
    type: "university",
  },
  {
    name: "Kirkland Hall",
    address: "2201 West End Ave, Nashville, TN 37235",
    type: "university",
  },
  {
    name: "Wilson Hall",
    address: "111 21st Ave S, Nashville, TN 37240",
    type: "university",
  },
  {
    name: "Garland Hall",
    address: "2301 Vanderbilt Pl, Nashville, TN 37235",
    type: "university",
  },
  {
    name: "Stevenson Center",
    address: "1225 Stevenson Center Ln, Nashville, TN 37235",
    type: "university",
  },
  {
    name: "Featheringill Hall",
    address: "400 24th Ave S, Nashville, TN 37212",
    type: "university",
  },
  {
    name: "Blair School of Music",
    address: "2400 Blakemore Ave, Nashville, TN 37212",
    type: "university",
  },
  {
    name: "Owen Graduate School of Management",
    address: "401 21st Ave S, Nashville, TN 37203",
    type: "university",
  },
  {
    name: "Law School",
    address: "131 21st Ave S, Nashville, TN 37203",
    type: "university",
  },
  {
    name: "Medical Center",
    address: "1211 Medical Center Dr, Nashville, TN 37232",
    type: "university",
  },
  {
    name: "Commons Center",
    address: "1231 18th Ave S, Nashville, TN 37212",
    type: "university",
  },
  {
    name: "Branscomb Quadrangle",
    address: "2401 Vanderbilt Pl, Nashville, TN 37212",
    type: "university",
  },
  {
    name: "Carmichael Towers",
    address: "2300 West End Ave, Nashville, TN 37203",
    type: "university",
  },
  {
    name: "Highland Quadrangle",
    address: "2402 Vanderbilt Pl, Nashville, TN 37212",
    type: "university",
  },
  {
    name: "Warren College",
    address: "310 23rd Ave S, Nashville, TN 37212",
    type: "university",
  },
  {
    name: "Moore College",
    address: "312 23rd Ave S, Nashville, TN 37212",
    type: "university",
  },
  {
    name: "Zeppos College",
    address: "331 23rd Ave S, Nashville, TN 37212",
    type: "university",
  },
  {
    name: "Student Life Center",
    address: "310 25th Ave S, Nashville, TN 37240",
    type: "university",
  },
  {
    name: "Recreation and Wellness Center",
    address: "2700 Children’s Way, Nashville, TN 37212",
    type: "university",
  },
  {
    name: "Rand Dining Center",
    address: "2301 Vanderbilt Pl, Nashville, TN 37235",
    type: "university",
  },
  {
    name: "Sarratt Student Center",
    address: "2301 Vanderbilt Pl, Nashville, TN 37235",
    type: "university",
  },
  {
    name: "Student Union",
    address: "310 25th Ave S, Nashville, TN 37240",
    type: "university",
  },
  {
    name: "Central Library",
    address: "419 21st Ave S, Nashville, TN 37203",
    type: "university",
  },
  {
    name: "Biomedical Library",
    address: "2209 Garland Ave, Nashville, TN 37232",
    type: "university",
  },
  {
    name: "Divinity Library",
    address: "411 21st Ave S, Nashville, TN 37240",
    type: "university",
  },
  {
    name: "Music Library",
    address: "2400 Blakemore Ave, Nashville, TN 37212",
    type: "university",
  },
  {
    name: "Vanderbilt Stadium",
    address: "2601 Jess Neely Dr, Nashville, TN 37212",
    type: "landmark",
  },
  {
    name: "Memorial Gymnasium",
    address: "2601 Jess Neely Dr, Nashville, TN 37212",
    type: "landmark",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");

    await Location.deleteMany({});
    console.log("🗑️ Cleared old locations");

    await Location.insertMany(locations);
    console.log(`🌱 Inserted ${locations.length} locations`);

    mongoose.connection.close();
    console.log("✅ Done!");
  } catch (err) {
    console.error("❌ Error seeding locations:", err);
    mongoose.connection.close();
  }
}

seed();
