const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const date = req.query.outbound_date;
  const flightNumberRaw = req.query.flight_number;
  const formattedFlightCode = flightNumberRaw.replace(
    /([A-Z]+)(\d+)/i,
    "$1 $2"
  );

  const departure_id = req.query.departure_id || "JFK";
  const arrival_id = req.query.arrival_id || "LAX";

  if (!date || !flightNumberRaw) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google_flights",
        departure_id,
        arrival_id,
        outbound_date: date,
        type: 2,
        include_airlines: flightNumberRaw.match(/[A-Z]+/i)[0].toUpperCase(),
        currency: "USD",
        hl: "en",
        gl: "us",
        api_key: process.env.FLIGHT_API_KEY,
      },
    });

    const bestFlights = response.data.best_flights || [];
    const otherFlights = response.data.other_flights || [];
    const allFlights = [...bestFlights, ...otherFlights];

    // Matching logic: normalize flight numbers (uppercase, remove spaces)
    const targetCode = flightNumberRaw.replace(/\s+/g, "").toUpperCase();
    console.log("Target Code:", targetCode);
    const matchingFlights = allFlights.filter((f) =>
      f.flights.some((leg) => {
        const flightNum = leg.flight_number.replace(/\s+/g, "").toUpperCase();
        console.log(flightNum);
        return flightNum === targetCode;
      })
    );

    // if (matchingFlights.length === 0) {
    //   return res.status(404).json({
    //     error: `No flights found for ${formattedFlightCode} on ${date}`,
    //   });
    // }

    res.json({ best_flights: bestFlights, matching_flights: matchingFlights });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch flights from SerpAPI" });
  }
});

module.exports = router;
