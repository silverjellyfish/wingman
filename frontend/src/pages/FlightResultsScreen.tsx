// Contributors: Michelle
// Time: 0.5 hours

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Button } from "@/components/ui/button.tsx";
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
      <div className="flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Back button */}
        <Button
          variant="back"
          className="mt-[1rem] pl-[2vw] pr-[2vw]"
          onClick={() => onNavigate("flightInput")}
        >
          Back
        </Button>
        <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] pt-[80px] px-[40px] w-full">
          <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
            <p className="leading-none" style={{ fontWeight: 600 }}>
              Search Flight
            </p>
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
                className="flex flex-col space-between p-[12px] bg-[#28282d] rounded-[20px] mt-[1rem]"
              >
                <div className="flex flex-row justify-between items-center">
                  <p className="text-xl" style={{ fontWeight: 600 }}>
                    {f.code}
                  </p>
                  <p
                    className="text-gray-400 text-sm"
                    style={{ fontWeight: 600 }}
                  >
                    {date}
                  </p>
                </div>
                <div className="flex justify-between text-white/80">
                  <p>
                    <span className="font-semibold">{f.from}</span> →{" "}
                    <span className="font-semibold">{f.to}</span>
                  </p>
                </div>
                <div className="grid grid-cols-3 text-sm text-gray-400 gap-2">
                  <p style={{ fontWeight: 600 }}>Launch: {f.launch}</p>
                  <p style={{ fontWeight: 600 }}>Landing: {f.landing}</p>
                  <p style={{ fontWeight: 600 }}>Boarding: {f.boarding}</p>
                </div>
                <Button
                  className="mt-[1rem] w-full"
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
