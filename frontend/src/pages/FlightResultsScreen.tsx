// Contributors: Michelle

import { BottomNavigation } from "../components/layout/BottomNavigation";
import { Button } from "../components/ui/button.tsx";
import { type Flight } from "@/mock/mockFlights.ts";
import type { Screen } from "@/types/index.ts";

interface FlightResultsScreenProps {
  onNavigate: (
    screen: Screen,
    planeCode?: string,
    date?: string,
    payload?: any
  ) => void;
  flights: Flight[];
  planeCode: string;
  date: string;
}

export function FlightResultsScreen({
  onNavigate,
  flights,
  planeCode,
  date,
}: FlightResultsScreenProps) {
  const filteredFlights = flights.filter(
    (f) => f.code === planeCode && f.date === date
  );

  return (
    <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Button
          variant="back"
          className="mt-[1rem] pl-[2vw] pr-[2vw]"
          onClick={() => onNavigate("flightInput", planeCode, date)}
        >
          Back
        </Button>

        <div className="flex flex-col gap-[40px] items-center pb-[40px] pt-[80px] px-[0px] w-full">
          <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
            <p className="leading-none font-semibold">Search Flights</p>
          </div>

          {/* Flight list */}
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
            {filteredFlights.length === 0 && (
              <p className="text-center text-gray-400">
                No flights found for {planeCode} on {date}.
              </p>
            )}

            {filteredFlights.map((f, idx) => (
              <div
                key={idx}
                className="bg-zinc-900 rounded-xl shadow-md p-5 w-full flex flex-col gap-3 border border-zinc-700 hover:border-accent transition-all"
              >
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold">{f.code}</p>
                  <p className="text-gray-400 text-sm">{date}</p>
                </div>
                <div className="flex justify-between text-white/80">
                  <p>
                    <span className="font-semibold">{f.from}</span> →{" "}
                    <span className="font-semibold">{f.to}</span>
                  </p>
                </div>
                <div className="grid grid-cols-3 text-sm text-gray-400 gap-2">
                  <p>Launch: {f.launch}</p>
                  <p>Landing: {f.landing}</p>
                  <p>Boarding: {f.boarding}</p>
                </div>
                <Button
                  className="mt-3 w-full"
                  onClick={() =>
                    onNavigate("flightPreferences", planeCode, date, f)
                  }
                >
                  Select
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomNavigation currentScreen="ride" onNavigate={onNavigate} />
    </div>
  );
}
