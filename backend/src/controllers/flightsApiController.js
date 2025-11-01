const { searchFlights } = require("../integrations/flightsApi");

exports.getSearchFlights = async (req, res) => {
  try {
    const { planeCode, date } = req.query;

    if (!planeCode || !date) {
      return res
        .status(400)
        .json({ error: "Missing required parameters: planeCode, date" });
    }

    // Split plane code: AA100 → AA + 100
    const match = planeCode.match(/^([A-Z]{2})(\d{1,4})$/i);
    if (!match) {
      return res.status(400).json({ error: "Invalid plane code format" });
    }

    const departure = match[1].toUpperCase();
    const arrival = match[2];

    const flights = await searchFlights({ departure, arrival, date });
    res.json({ flights });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch flight data" });
  }
};
