// controllers/flightsController.js
const { searchFlights } = require('../integrations/flightsApi');

exports.getFlights = async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;

    if (!departure || !arrival || !date) {
      return res.status(400).json({ error: 'Missing required parameters: departure, arrival, date' });
    }

    const flights = await searchFlights({ departure, arrival, date });
    res.json(flights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
};
