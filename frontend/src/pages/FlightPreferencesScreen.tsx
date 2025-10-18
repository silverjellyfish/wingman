import { useState } from "react";
import { FlightResultCard } from "../components/FlightResultCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

type Screen =
   | "ride"
   | "flightInput"
   | "flightDate"
   | "loading"
   | "groupMatching"
   | "flightResults"
   | "flightPreferences"
   | "groupDetail"
   | "rideWithGroup"
   | "trip"
   | "profile"
   | "results";

interface Flight {
   id: string;
   flightCode: string;
   dateRange: string;
   route: string;
   airports: string;
   boardingTime: string;
   departureTime: string;
   arrivalTime: string;
}

interface FlightPreferencesScreenProps {
   onNavigate: (screen: Screen) => void;
   selectedFlight: Flight;
}

export function FlightPreferencesScreen({
   onNavigate,
   selectedFlight,
}: FlightPreferencesScreenProps) {
   const [earliestBeforeBoarding, setEarliestBeforeBoarding] = useState("120");
   const [latestBeforeBoarding, setLatestBeforeBoarding] = useState("60");
   const [checkedBags, setCheckedBags] = useState("");
   const [carryOnBags, setCarryOnBags] = useState("");
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

   const filteredLocations = locations.filter((location) =>
      location.toLowerCase().includes(searchQuery.toLowerCase())
   );

   const calculateArrivalTime = (minutesBefore: string): string => {
      if (!minutesBefore || !selectedFlight.boardingTime) return "--:--";

      const minutes = parseInt(minutesBefore);
      if (isNaN(minutes)) return "--:--";

      // Parse boarding time (format: "10:00 AM" or "10:00 PM")
      const timeMatch = selectedFlight.boardingTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!timeMatch) return "--:--";

      let hours = parseInt(timeMatch[1]);
      const mins = parseInt(timeMatch[2]);
      const period = timeMatch[3].toUpperCase();

      // Convert to 24-hour format
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      // Subtract minutes
      const totalMinutes = hours * 60 + mins - minutes;
      let newHours = Math.floor(totalMinutes / 60);
      let newMins = totalMinutes % 60;

      // Handle negative times (previous day)
      if (newHours < 0) newHours += 24;

      // Convert back to 12-hour format
      const newPeriod = newHours >= 12 ? "PM" : "AM";
      let displayHours = newHours % 12;
      if (displayHours === 0) displayHours = 12;

      return `${displayHours}:${newMins.toString().padStart(2, '0')} ${newPeriod}`;
   };

   const earliestArrival = calculateArrivalTime(earliestBeforeBoarding);
   const latestArrival = calculateArrivalTime(latestBeforeBoarding);

   const handleTimingChange = (
      value: string,
      setter: (value: string) => void
   ) => {
      // Only allow numbers and limit to 4 digits
      const numbersOnly = value.replace(/\D/g, "");
      if (numbersOnly.length <= 3) {
         setter(numbersOnly);
      }
   };

   const handleLuggageChange = (
      value: string,
      setter: (value: string) => void
   ) => {
      // Only allow numbers and limit to 1 digit
      const numbersOnly = value.replace(/\D/g, "");
      if (numbersOnly.length <= 1) {
         setter(numbersOnly);
      }
   };

   // Check if all required fields are filled
   const isFormValid = () => {
      return (
         earliestBeforeBoarding.trim() !== "" &&
         latestBeforeBoarding.trim() !== "" &&
         checkedBags.trim() !== "" &&
         carryOnBags.trim() !== "" &&
         pickupLocation.trim() !== ""
      );
   };

   const handleSearch = () => {
      console.log("Searching for rideshare with preferences:", {
         flight: selectedFlight,
         earliestBeforeBoarding,
         latestBeforeBoarding,
         checkedBags,
         carryOnBags,
         pickupLocation,
      });
      // Navigate to loading screen which will then navigate to results
      onNavigate("loading");
   };

   return (
      <div className="bg-[#16161b] flex flex-col justify-between h-full text-white pt-[40px]">
         {/* Main Content - Scrollable */}
         <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="box-border content-stretch flex flex-col gap-[32px] items-start relative w-full">
               {/* Back Button */}
               <Button
                  onClick={() => onNavigate("ride")}
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
                        flight={selectedFlight}
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
                                    value={checkedBags}
                                    onChange={(e) =>
                                       handleLuggageChange(
                                          e.target.value,
                                          setCheckedBags
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
                                    value={carryOnBags}
                                    onChange={(e) =>
                                       handleLuggageChange(
                                          e.target.value,
                                          setCarryOnBags
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
                     onClick={handleSearch}
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
