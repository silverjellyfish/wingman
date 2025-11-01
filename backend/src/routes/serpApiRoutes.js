const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const date = req.query.outbound_date;
  const flightNumberRaw = req.query.flight_number; // e.g., "AA100"
  const formattedFlightCode = flightNumberRaw.replace(
    /([A-Z]+)(\d+)/i,
    "$1 $2"
  ); // e.g., "AA 100"
  console.log("Formatted flight code:", formattedFlightCode);

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
        include_airlines: flightNumberRaw.match(/[A-Z]+/i)[0].toUpperCase(), // automatically extract airline code
        currency: "USD",
        hl: "en",
        gl: "us",
        api_key: process.env.FLIGHT_API_KEY,
      },
    });

    const bestFlights = response.data.best_flights || [];
    const otherFlights = response.data.other_flights || [];
    const allFlights = [...bestFlights, ...otherFlights];
    console.log(`Total best flights returned: ${bestFlights.length}`);

    // Debug: show all flights
    allFlights.forEach((option, i) => {
      console.log(`\nFlight option #${i + 1}:`);
      option.flights.forEach((leg, j) => {
        console.log(
          `  Leg #${j + 1}: ${leg.flight_number} ` +
            `(${leg.departure_airport.id} → ${leg.arrival_airport.id}) ` +
            `Airline: ${leg.airline}, Departure: ${leg.departure_airport.time}, Arrival: ${leg.arrival_airport.time}, Price: ${option.price}`
        );
      });
    });

    // Matching logic: normalize flight numbers (uppercase, remove spaces)
    const targetCode = flightNumberRaw.replace(/\s+/g, "").toUpperCase();
    console.log("TARGET CODE:", targetCode);
    const matchingFlights = allFlights.filter((f) =>
      f.flights.some((leg) => {
        const flightNum = leg.flight_number.replace(/\s+/g, "").toUpperCase();
        console.log(flightNum);
        return flightNum === targetCode;
      })
    );

    console.log(
      `Matching flights for ${formattedFlightCode}:`,
      matchingFlights
    );

    if (matchingFlights.length === 0) {
      return res.status(404).json({
        error: `No flights found for ${formattedFlightCode} on ${date}`,
      });
    }

    res.json({ best_flights: bestFlights, matching_flights: matchingFlights });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch flights from SerpAPI" });
  }
});

module.exports = router;
