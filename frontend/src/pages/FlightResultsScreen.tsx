import { useState } from "react";
import { FlightResultCard } from "@/components/FlightResultCard";
import type { Screen } from "@/types/index.ts";
import { useFlights } from "@/hooks/useFlights.ts";
import type { Flight } from "@/hooks/useFlights.ts";

interface FlightResultsScreenProps {
  onNavigate: (
    screen: Screen,
    planeCode?: string,
    date?: string,
    payload?: any
  ) => void;
  planeCode: string;
  date: string;
}

export function FlightResultsScreen({
  onNavigate,
  planeCode,
  date,
}: FlightResultsScreenProps) {
  const { flights, loading, error } = useFlights(planeCode, date, true);
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null);

  const handleExpand = (flightId: string) => {
    setExpandedFlightId(expandedFlightId === flightId ? null : flightId);
  };

  const handleSelect = (flight: Flight) => {
    onNavigate("flightPreferences", planeCode, date, flight);
  };

  const getTimeOnly = (dateTime: string) => dateTime.split(" ")[1] || dateTime;

  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-[12px] pt-[20px]">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="spinner mb-4" />
          <p>Searching for flights...</p>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : flights.length === 0 ? (
        <p className="text-gray-400 text-center">
          No flights found for {planeCode} on {date}.
        </p>
      ) : (
        <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col gap-[16px] items-start w-full pb-[40px]">
            {flights.map((f, idx) => (
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
                isExpanded={expandedFlightId === `${f.flightNumber}-${idx}`}
                onExpand={handleExpand}
                onSelect={() => handleSelect(f)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
