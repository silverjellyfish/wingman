const axios = require("axios");

const SERP_API_KEY = process.env.SERP_API_KEY || "YOUR_SERPAPI_KEY_HERE";

exports.searchFlights = async ({
  departure,
  arrival,
  date,
  deepSearch = false,
}) => {
  const url = "https://serpapi.com/search";

  const params = {
    engine: "google_flights",
    departure_id: departure,
    arrival_id: arrival,
    outbound_date: date,
    deep_search: deepSearch,
    api_key: SERP_API_KEY,
  };

  const { data } = await axios.get(url, { params });
  return data;
};
