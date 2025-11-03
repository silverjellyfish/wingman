import { useEffect, useState } from "react";
import { FlightResultCard } from "@/components/FlightResultCard";
import type { Screen } from "@/types/index.ts";
import { useFlights } from "@/hooks/useFlights.ts";
import type { Flight } from "@/hooks/useFlights.ts";
import { Button } from "@/components/ui/button.tsx";

interface FlightSearchPayload {
  departureId: string;
  arrivalId: string;
}

interface FlightResultsScreenProps {
  onNavigate: (
    screen: Screen,
    planeCode?: string,
    date?: string,
    payload?: any
  ) => void;
  flights?: Flight[];
  planeCode: string;
  date: string;
  payload?: FlightSearchPayload;
}

export function FlightResultsScreen({
  onNavigate,
  planeCode,
  date,
  payload,
}: FlightResultsScreenProps) {
  console.log("FlightResultsScreen payload:", payload);
  const { flights, loading, error } = useFlights(
    planeCode,
    date,
    payload?.departureId,
    payload?.arrivalId,
    true
  );
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null);

  // 👇 Local state for enforcing minimum 1-second loading
  const [minLoading, setMinLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMinLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const isStillLoading = loading || minLoading;

  const handleExpand = (flightId: string) => {
    setExpandedFlightId(expandedFlightId === flightId ? null : flightId);
  };

  const handleSelect = (flight: Flight) => {
    const mappedFlight = {
      code: flight.flightNumber,
      from: flight.from,
      to: flight.to,
      boarding: flight.departureTime,
      launch: flight.departureTime,
      landing: flight.arrivalTime,
    };
    onNavigate("flightPreferences", planeCode, date, mappedFlight);
  };

  const getTimeOnly = (dateTime: string) => dateTime.split(" ")[1] || dateTime;

  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-[12px] pt-[20px]">
      {isStillLoading ? (
        <div className="flex flex-col items-center justify-center h-full text-white">
          <p className="text-lg font-medium mb-4">Searching for flights...</p>
          <div className="spinner" />
        </div>
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
              <p className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-none relative text-[18px] text-white tracking-[0.07px] w-full">
                Flight Results
              </p>

              {/* Flight Cards */}
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                {flights.length === 0 ? (
                  <p className="text-center text-gray-400 w-full">
                    No flights found for {planeCode} on {date}.
                  </p>
                ) : (
                  flights.map((f, idx) => (
                    <FlightResultCard
                      key={idx}
                      flight={{
                        id: `${f.flightNumber}-${idx}`,
                        flightCode: f.flightNumber,
                        dateRange: date,
                        route: `${f.from} → ${f.to}`,
                        airports: `${f.from} - ${f.to}`,
                        boardingTime: getTimeOnly(f.departureTime),
                        departureTime: getTimeOnly(f.departureTime),
                        arrivalTime: getTimeOnly(f.arrivalTime),
                      }}
                      isExpanded={
                        expandedFlightId === `${f.flightNumber}-${idx}`
                      }
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
