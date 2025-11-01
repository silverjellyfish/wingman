import { useState, useEffect } from "react";

export interface Flight {
  flightNumber: string;
  airline: string;
  airlineLogo: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  airplane: string;
  duration: number;
  price: number;
  legroom?: string;
  extensions?: string[];
  bookingToken?: string;
}

export function useFlights(planeCode: string, date: string, enabled: boolean) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const fetchFlights = async () => {
      setLoading(true);
      setError(null);

      const departure_id = "JFK";
      const arrival_id = "LAX";

      // Add space between letters and numbers if needed
      const formattedFlightCode = planeCode.replace(/([A-Z]+)(\d+)/, "$1 $2");

      const queryParams = new URLSearchParams({
        departure_id,
        arrival_id,
        outbound_date: date,
        type: "2",
        flight_number: planeCode,
        currency: "USD",
        hl: "en",
        gl: "us",
      });

    //   console.log(
    //     "Fetching flights with params:",
    //     Object.fromEntries(queryParams)
    //   );

      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(
          `${API_BASE_URL}/serpFlights?${queryParams.toString()}`
        );
        // console.log("API url: ", `${API_BASE_URL}/serpFlights?${queryParams.toString()}`);

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch flights: ${text}`);
        }

        const data = await res.json();
        // console.log("Flights data:", data);

        const apiFlights: Flight[] =
          data?.best_flights?.map((f: any) => {
            const flightLeg = f.flights[0]; // assuming first leg
            return {
              flightNumber: flightLeg.flight_number,
              airline: flightLeg.airline,
              airlineLogo: flightLeg.airline_logo,
              from: flightLeg.departure_airport.id,
              to: flightLeg.arrival_airport.id,
              departureTime: flightLeg.departure_airport.time,
              arrivalTime: flightLeg.arrival_airport.time,
              airplane: flightLeg.airplane,
              duration: flightLeg.duration,
              price: f.price,
              legroom: flightLeg.legroom,
              extensions: flightLeg.extensions,
              bookingToken: f.booking_token,
            };
          }) || [];

        // console.log("Mapped flights:", apiFlights);
        setFlights(apiFlights);
      } catch (err: any) {
        console.error("Error fetching flights:", err);
        setError("Failed to fetch flights");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [planeCode, date, enabled]);

  return { flights, loading, error };
}
