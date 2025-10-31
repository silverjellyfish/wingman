// Contributors: Michelle
// Time: 2 hours

import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { FlightResultCard } from "@/components/FlightResultCard";
import type { Flight as MockFlight } from "@/mock/mockFlights.ts";
import type { Screen } from "@/types/index.ts";

interface RidePreferencesScreenProps {
   onNavigate: (
      screen: Screen,
      planeCode?: string,
      date?: string,
      payload?: any
   ) => void;
   flight: MockFlight;
}

export function RidePreferencesScreen({
   onNavigate,
   flight,
}: RidePreferencesScreenProps) {
   const [earliestBeforeBoarding, setEarliestBeforeBoarding] = useState("");
   const [latestBeforeBoarding, setLatestBeforeBoarding] = useState("");
   const [numCarryOn, setNumCarryOn] = useState("1");
   const [numChecked, setNumChecked] = useState("0");
   const [pickupLocation, setPickupLocation] = useState("");
   const [searchQuery, setSearchQuery] = useState("");
   const [showDropdown, setShowDropdown] = useState(false);

   const locations = [
      "Buttrick Hall",
      "Kirkland Hall",
      "Wilson Hall",
      "Garland Hall",
      "Stevenson Center",
      "Featheringill Hall",
      "Blair School of Music",
      "Owen Graduate School of Management",
      "Law School",
      "Medical Center",
      "Commons Center",
      "Branscomb Quadrangle",
      "Carmichael Towers",
      "Highland Quadrangle",
      "Warren College",
      "Moore College",
      "Zeppos College",
      "Student Life Center",
      "Recreation and Wellness Center",
      "Rand Dining Center",
      "Sarratt Student Center",
      "Student Union",
      "Central Library",
      "Biomedical Library",
      "Divinity Library",
      "Music Library",
      "Vanderbilt Stadium",
      "Memorial Gymnasium",
   ];

   // Filter locations based on search query
   const filteredLocations = locations.filter((location) =>
      location
         .toLowerCase()
         .includes((searchQuery || pickupLocation).toLowerCase())
   );

   // Parse flight time
   const parseFlightTime = (timeStr: string) => {
      const [hoursMinutes, ampm] = timeStr.split(" ");
      const [hours, minutes] = hoursMinutes.split(":").map(Number);
      let hrs = hours;
      if (ampm.toLowerCase() === "pm" && hours < 12) hrs += 12;
      if (ampm.toLowerCase() === "am" && hours === 12) hrs = 0;
      const d = new Date();
      d.setHours(hrs, minutes, 0, 0);
      return d;
   };

   const boardingTime = parseFlightTime(flight.boarding);

   // Format the time
   const formatTime = (d: Date) =>
      d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

   // Calculate arrival times based on minutes before boarding
   const calculateArrivalTime = (minutesBefore: string) => {
      if (!minutesBefore || minutesBefore === "") return "--:--";
      const mins = parseInt(minutesBefore);
      if (isNaN(mins)) return "--:--";
      const arrivalTime = new Date(boardingTime);
      arrivalTime.setMinutes(arrivalTime.getMinutes() - mins);
      return formatTime(arrivalTime);
   };

   const earliestArrival = calculateArrivalTime(earliestBeforeBoarding);
   const latestArrival = calculateArrivalTime(latestBeforeBoarding);

   // Handle timing input changes
   const handleTimingChange = (
      value: string,
      setter: (val: string) => void
   ) => {
      // Only allow numbers
      const numericValue = value.replace(/[^0-9]/g, "");
      setter(numericValue);
   };

   // Validate form - all fields must have values
   const isFormValid = () => {
      return (
         earliestBeforeBoarding !== "" &&
         latestBeforeBoarding !== "" &&
         numCarryOn !== "" &&
         numChecked !== "" &&
         pickupLocation !== ""
      );
   };

   // Transform MockFlight to FlightResultCard format
   const transformedFlight = {
      id: flight.code,
      flightCode: flight.code,
      dateRange: flight.date,
      route: `${flight.from} → ${flight.to}`,
      airports: `${flight.from} - ${flight.to}`,
      boardingTime: flight.boarding,
      departureTime: flight.launch,
      arrivalTime: flight.landing,
   };

   return (
      <div className="bg-[#16161b] flex flex-col justify-between h-full text-white p-[12px] pt-[20px]">
         {/* Main Content - Scrollable */}
         <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="box-border content-stretch flex flex-col gap-[32px] items-start relative w-full">
               {/* Back Button */}
               <Button
                  onClick={() =>
                     onNavigate("flightResults", flight.code, flight.date)
                  }
                  variant="outline"
                  className="gap-[8px] w-auto border-2 px-[12px] py-[8px]"
               >
                  <span className="material-symbols-outlined text-[20px]">
                     arrow_back
                  </span>
                  Back
               </Button>

               {/* Main Content Container */}
               <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full px-[4px]">
                  {/* Flight Info Card */}
                  <div className="pointer-events-none w-full">
                     <FlightResultCard
                        flight={transformedFlight}
                        isExpanded={false}
                        onExpand={() => {}}
                        onSelect={() => {}}
                     />
                  </div>

                  {/* Preferences Form */}
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                     {/* Timing Section */}
                     <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                        <p
                           className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                           style={{ fontWeight: 600 }}
                        >
                           Timing
                        </p>

                        <div className="content-stretch flex gap-[26px] items-start relative shrink-0 w-full">
                           {/* Earliest before boarding */}
                           <div className="content-stretch flex flex-col gap-[14px] items-start relative w-full">
                              <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
                                 <p
                                    className="leading-none relative text-[14px] text-white tracking-[0.07px] w-full"
                                    style={{ fontWeight: 600 }}
                                 >
                                    Earliest
                                 </p>
                                 <div className="flex items-center gap-[8px] w-full">
                                    <Input
                                       type="text"
                                       inputMode="numeric"
                                       value={earliestBeforeBoarding}
                                       onChange={(e) =>
                                          handleTimingChange(
                                             e.target.value,
                                             setEarliestBeforeBoarding
                                          )
                                       }
                                       className="w-[80px]"
                                       style={{ maxWidth: "80px" }}
                                    />
                                    <span className="text-[14px] text-zinc-400">
                                       mins
                                    </span>
                                 </div>
                              </div>

                              <div className="content-stretch flex flex-col gap-[8px] items-start leading-none relative shrink-0">
                                 <p
                                    className="leading-none relative text-[14px] text-zinc-400 tracking-[0.07px]"
                                    style={{ fontWeight: 600 }}
                                 >
                                    Earliest Arrival
                                 </p>
                                 <p className="font-['Geist:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-white tracking-[0.08px]">
                                    {earliestArrival}
                                 </p>
                              </div>
                           </div>

                           {/* Latest before boarding */}
                           <div className="content-stretch flex flex-col gap-[14px] items-start relative w-full">
                              <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
                                 <p
                                    className="leading-none relative text-[14px] text-white tracking-[0.07px] w-full"
                                    style={{ fontWeight: 600 }}
                                 >
                                    Latest
                                 </p>
                                 <div className="flex items-center gap-[8px] w-full">
                                    <Input
                                       type="text"
                                       inputMode="numeric"
                                       value={latestBeforeBoarding}
                                       onChange={(e) =>
                                          handleTimingChange(
                                             e.target.value,
                                             setLatestBeforeBoarding
                                          )
                                       }
                                       className="w-[80px]"
                                       style={{ maxWidth: "80px" }}
                                    />
                                    <span className="text-[14px] text-zinc-400">
                                       mins
                                    </span>
                                 </div>
                              </div>

                              <div className="content-stretch flex flex-col gap-[8px] items-start leading-none relative shrink-0">
                                 <p
                                    className="leading-none relative text-[14px] text-zinc-400 tracking-[0.07px]"
                                    style={{ fontWeight: 600 }}
                                 >
                                    Latest Arrival
                                 </p>
                                 <p className="font-['Geist:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[16px] text-white tracking-[0.08px]">
                                    {latestArrival}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Divider */}
                     <div className="h-[2px] w-full bg-zinc-800 rounded-full" />

                     {/* Luggage Section */}
                     <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                        <p
                           className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                           style={{ fontWeight: 600 }}
                        >
                           Luggage
                        </p>

                        <div className="content-stretch flex gap-[26px] items-center relative shrink-0 w-full">
                           {/* Checked Bags */}
                           <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
                              <p
                                 className="leading-none relative text-[14px] text-white tracking-[0.07px] w-full"
                                 style={{ fontWeight: 600 }}
                              >
                                 Checked Bags
                              </p>
                              <div className="flex items-center gap-[8px] w-full">
                                 <Input
                                    type="text"
                                    inputMode="numeric"
                                    value={numChecked}
                                    onChange={(e) =>
                                       setNumChecked(
                                          e.target.value.replace(/[^0-9]/g, "")
                                       )
                                    }
                                    className="w-[60px]"
                                    style={{ maxWidth: "60px" }}
                                    placeholder="0"
                                 />
                                 <span className="text-[14px] text-zinc-400">
                                    bags
                                 </span>
                              </div>
                           </div>

                           {/* Carry-On Bags */}
                           <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
                              <p
                                 className="leading-none relative text-[14px] text-white tracking-[0.07px] w-full"
                                 style={{ fontWeight: 600 }}
                              >
                                 Carry-On Bags
                              </p>
                              <div className="flex items-center gap-[8px] w-full">
                                 <Input
                                    type="text"
                                    inputMode="numeric"
                                    value={numCarryOn}
                                    onChange={(e) =>
                                       setNumCarryOn(
                                          e.target.value.replace(/[^0-9]/g, "")
                                       )
                                    }
                                    className="w-[60px]"
                                    style={{ maxWidth: "60px" }}
                                    placeholder="0"
                                 />
                                 <span className="text-[14px] text-zinc-400">
                                    bags
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Divider */}
                     <div className="h-[2px] w-full bg-zinc-800 rounded-full" />

                     {/* Pick up Location */}
                     <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
                        <p
                           className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                           style={{ fontWeight: 600 }}
                        >
                           Pick up Location
                        </p>
                        <div className="relative w-full">
                           <Input
                              type="text"
                              value={searchQuery || pickupLocation}
                              onChange={(e) => {
                                 setSearchQuery(e.target.value);
                                 setShowDropdown(true);
                              }}
                              onFocus={() => setShowDropdown(true)}
                              onBlur={() => {
                                 // Delay to allow click on dropdown item
                                 setTimeout(() => setShowDropdown(false), 200);
                              }}
                              placeholder="Search location"
                           />
                           {showDropdown && filteredLocations.length > 0 && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-primary-foreground border-accent border-[2px] rounded-[10px] shadow-lg max-h-[200px] overflow-y-auto z-50">
                                 {filteredLocations.map((location) => (
                                    <button
                                       key={location}
                                       onMouseDown={(e) => {
                                          e.preventDefault(); // Prevent blur
                                          setPickupLocation(location);
                                          setSearchQuery("");
                                          setShowDropdown(false);
                                       }}
                                       className="w-full text-left px-[14px] py-[12px] hover:bg-accent text-primary transition-colors"
                                    >
                                       {location}
                                    </button>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>

                  {/* Search Button */}
                  <Button
                     onClick={() =>
                        onNavigate("loading", undefined, undefined, {
                           flight,
                           earliestTime: earliestArrival,
                           latestTime: latestArrival,
                           numCarryOn,
                           numChecked,
                           pickupLocation,
                        })
                     }
                     className="w-full"
                     disabled={!isFormValid()}
                  >
                     Search for rideshare
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
