import { useEffect, useState } from "react";
import { FlightResultCard } from "@/components/FlightResultCard";
import type { Screen, MappedFlight } from "@/types/index.ts";
import { useFlights } from "@/hooks/useFlights.ts";
import type { Flight } from "@/hooks/useFlights.ts";
import { Button } from "@/components/ui/button.tsx";
import { LoadingScreen } from "@/pages/LoadingScreen";

/**
 * Interface for flight results payload
 */
interface FlightResultsPayload {
  departureId?: string;
  arrivalId?: string;
  flights?: MappedFlight[];
}

/**
 * Props for FlightResultsScreen component
 */
interface FlightResultsScreenProps {
  onNavigate: (
    screen: Screen,
    planeCode?: string,
    date?: string,
    payload?: any
  ) => void;
  planeCode: string;
  date: string;
  payload?: FlightResultsPayload;
}

const getBoardingTime = (dateTime: string) => {
  const departure = new Date(dateTime);
  const boarding = new Date(departure);
  boarding.setMinutes(boarding.getMinutes() - 30);

  return boarding.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getTimeOnly = (dateTime: string) => {
  const d = new Date(dateTime);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export function FlightResultsScreen({
  onNavigate,
  planeCode,
  date,
  payload,
}: FlightResultsScreenProps) {
  const initialFlights = payload?.flights || [];
  const shouldFetchFlights =
    !!payload && !!planeCode && !!date && initialFlights.length === 0;
  const {
    flights: apiFlights,
    loading,
    error,
  } = useFlights(
    planeCode?.replace(/\s+/g, ""),
    date,
    payload?.departureId,
    payload?.arrivalId,
    shouldFetchFlights
  );
  const flights = initialFlights.length > 0 ? initialFlights : apiFlights;
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null);
  const [minLoading, setMinLoading] = useState(true);
  const [mappedFlights, setMappedFlights] = useState<MappedFlight[]>([]);

  const formatTo12Hour = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  // Determine minimum loading time
  useEffect(() => {
    if (!shouldFetchFlights) {
      setMinLoading(false);
      return;
    }
    const timer = setTimeout(() => setMinLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [shouldFetchFlights]);

  // Map flights to MappedFlight format
  useEffect(() => {
    if (flights && flights.length > 0) {
      const isApiFlight = (f: any): f is Flight =>
        f &&
        typeof f.flightNumber === "string" &&
        typeof f.departureTime === "string";

      const isMappedFlight = (f: any): f is MappedFlight =>
        f &&
        typeof f.flightCode === "string" &&
        typeof f.dateRange === "string";

      let transformed: MappedFlight[];

      if (isMappedFlight(flights[0])) {
        // If we received mapped flights from the payload (navigating back)
        transformed = flights as MappedFlight[];
      } else if (isApiFlight(flights[0])) {
        // If we received fresh API data (navigating from input)
        transformed = (flights as Flight[]).map((f, idx) => ({
          id: `${f.flightNumber}-${idx}`,
          flightCode: f.flightNumber.replace(/\s+/g, ""),
          dateRange: date,
          route: `${f.from} → ${f.to}`,
          airports: `${f.from} - ${f.to}`,
          boardingTime: getBoardingTime(f.departureTime),
          departureTime: getTimeOnly(f.departureTime),
          arrivalTime: getTimeOnly(f.arrivalTime),
          airlineLogo: f.airlineLogo,
        }));
      } else {
        transformed = [];
      }

      setMappedFlights(transformed);
    }
  }, [flights, date]);

  const isStillLoading = loading || minLoading;

  const handleExpand = (flightId: string) => {
    setExpandedFlightId(expandedFlightId === flightId ? null : flightId);
  };
  const ensureAirportExists = async (airportCode: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/airports/ensure`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: airportCode,
          }),
        }
      );
      console.log("Ensure airport response:", response);
      if (!response.ok) {
        throw new Error("Failed to ensure airport existence.");
      }
      console.log("Response status:", response.status);
      const airport = await response.json();
      console.log("Ensured airport:", airport);
      return airport._id;
    } catch (error) {
      console.error("Error saving airport:", error);
      throw new Error(
        `Could not find or create airport with code: ${airportCode}`
      );
    }
  };

  const handleSelect = async (f: MappedFlight) => {
    const originAirportName = f.route.split(" → ")[0];
    const destinationAirportName = f.route.split(" → ")[1];

    // 1. ENSURE DROP-OFF AIRPORT EXISTS
    let dropoffAirportId = "";
    console.log("Ensuring airport exists for code:", originAirportName);
    try {
      dropoffAirportId = await ensureAirportExists(originAirportName);
    } catch (err) {
      console.error(err);
      return;
    }

    const mappedFlight = {
      code: f.flightCode,
      from: originAirportName,
      to: destinationAirportName,
      boarding: f.boardingTime,
      launch: f.departureTime,
      landing: f.arrivalTime,
      date: f.dateRange,
      // 2. ADD THE AIRPORT ID TO THE PAYLOAD
      dropoffAirportId: dropoffAirportId,
    };

    onNavigate("flightPreferences", planeCode, date, {
      flight: { ...mappedFlight, airlineLogo: f.airlineLogo },
      flights: mappedFlights,
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-[12px] pt-[20px]">
      {isStillLoading ? (
        <LoadingScreen text="Searching for flights..." duration={1000} />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] w-full">
            {/* Back Button */}
            <div className="content-stretch flex items-start relative shrink-0 w-full">
              <Button
                onClick={() => onNavigate("flightInput")}
                variant="outline"
                className="gap-[8px] w-auto border-2 px-[12px] py-[8px]"
              >
                <span className="material-symbols-outlined text-[20px]">
                  arrow_back
                </span>
                Back
              </Button>
            </div>

            {/* Flight Results Section */}
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <div className="flex flex-col justify-center relative text-[32px] mb-[2rem] text-center text-white tracking-[0.12px] w-full">
                <p className="leading-none font-semibold">Flight Results</p>
              </div>

              {/* Flight Cards */}
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                {mappedFlights.length === 0 ? (
                  <p className="text-center text-gray-400 w-full">
                    No flights found for {planeCode} on {date}.
                  </p>
                ) : (
                  mappedFlights.map((f, idx) => (
                    <FlightResultCard
                      key={f.id}
                      flight={f}
                      isExpanded={expandedFlightId === f.id}
                      onExpand={handleExpand}
                      onSelect={() => handleSelect(f)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
