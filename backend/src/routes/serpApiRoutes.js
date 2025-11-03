// AC 1102
// Nashville to Toronto
// dec 26
/*
Target Code: AC1102 -> AC1102
Leg flight number: AC 1102
AC1102
Leg flight number: UA 396
UA396
Leg flight number: AC 510
AC510
Leg flight number: AC 8856
AC8856
Leg flight number: UA 396
UA396
Leg flight number: UA 1364
UA1364
Target Code: AC1102 -> AC1102
Leg flight number: AC 1102
AC1102
Leg flight number: UA 396
UA396
Leg flight number: AC 510
AC510
Leg flight number: AC 8856
AC8856
Leg flight number: UA 396
UA396
Leg flight number: UA 1364
UA1364

 */
const express = require("express");
const axios = require("axios");
const router = express.Router();

const ENGINE = "google_flights";
const ROUNDTRIP_SETTING = 2;
const CURRENCY = "USD";
const HL = "en";
const GL = "us";

router.get("/", async (req, res) => {
  const date = req.query.outbound_date;
  const flightNumberRaw = req.query.flight_number;

  const departureId = req.query.departure_id || "JFK";
  const arrivalId = req.query.arrival_id || "LAX";

  const airlineName = flightNumberRaw.match(/[A-Z]+/i)[0].toUpperCase();

  if (!date || !flightNumberRaw) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: ENGINE,
        departure_id: departureId,
        arrival_id: arrivalId,
        outbound_date: date,
        type: ROUNDTRIP_SETTING,
        include_airlines: airlineName,
        currency: CURRENCY,
        hl: HL,
        gl: GL,
        api_key: process.env.FLIGHT_API_KEY,
      },
    });

    const bestFlights = response.data.best_flights || [];
    const otherFlights = response.data.other_flights || [];
    const allFlights = [...bestFlights, ...otherFlights];

    const matchingFlights = allFlights.filter((f) =>
      f.flights.some((leg) => {
        const flightNum = leg.flight_number.replace(/\s+/g, "").toUpperCase();
        return flightNum === flightNumberRaw;
      })
    );

    res.json({ best_flights: bestFlights, matching_flights: matchingFlights });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch flights from SerpAPI" });
  }
});

module.exports = router;
