// Contributors: Michelle
// Time: 0.5 hours

import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { FlightResultCard } from "@/components/FlightResultCard";
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
   const [expandedFlightId, setExpandedFlightId] = useState<string | null>(
      null
   );

   const filteredFlights = flights.filter(
      (f) => f.code === planeCode && f.date === date
   );

   const handleExpand = (flightId: string) => {
      setExpandedFlightId(expandedFlightId === flightId ? null : flightId);
   };

   const handleSelect = (flight: any) => {
      onNavigate("flightPreferences", planeCode, date, flight);
   };

   return (
      <div className="flex flex-col h-full bg-[#16161b] text-white p-[12px] pt-[20px]">
         {/* Main Content - Scrollable */}
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
                     {filteredFlights.length === 0 && (
                        <p className="text-center text-gray-400 w-full">
                           No flights found for {planeCode} on {date}.
                        </p>
                     )}

                     {filteredFlights.map((f, idx) => (
                        <FlightResultCard
                           key={idx}
                           flight={{
                              id: `${f.code}-${idx}`,
                              flightCode: f.code,
                              dateRange: date,
                              route: `${f.from} → ${f.to}`,
                              airports: `${f.from} - ${f.to}`,
                              boardingTime: f.boarding,
                              departureTime: f.launch,
                              arrivalTime: f.landing,
                           }}
                           isExpanded={expandedFlightId === `${f.code}-${idx}`}
                           onExpand={handleExpand}
                           onSelect={() => handleSelect(f)}
                        />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
