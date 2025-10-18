import { useState } from "react";
import { BottomNavigation } from "../components/layout/BottomNavigation";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { useAuth } from "../contexts/AuthContext";
import { Calendar } from "../components/ui/calendar";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "../components/ui/dialog";
import { FlightResultCard } from "../components/FlightResultCard";

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

interface RideScreenProps {
   onNavigate: (screen: Screen, flight?: Flight) => void;
   hasJoinedGroup: boolean;
}

export function RideScreen({ onNavigate, hasJoinedGroup }: RideScreenProps) {
   const { user } = useAuth();
   const firstName = user?.name?.split(" ")[0] || "there";
   const [isInputFocused, setIsInputFocused] = useState(false);
   const [planeCode, setPlaneCode] = useState("");
   const [showSplitInputs, setShowSplitInputs] = useState(false);
   const [airlineCode, setAirlineCode] = useState("");
   const [flightNumber, setFlightNumber] = useState("");
   const [flightDate, setFlightDate] = useState("");
   const [showCalendar, setShowCalendar] = useState(false);
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      undefined
   );
   const [isSearching, setIsSearching] = useState(false);
   const [flights, setFlights] = useState<Flight[]>([]);
   const [expandedFlightId, setExpandedFlightId] = useState<string | null>(
      null
   );

   const handlePlaneCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase();

      // Allow only letters and numbers
      const sanitized = value.replace(/[^A-Z0-9]/g, "");

      // Validate format: 2-3 letters followed by up to 4 numbers
      const match = sanitized.match(/^([A-Z]{0,3})([0-9]{0,4})$/);

      if (match) {
         const letters = match[1];
         const numbers = match[2];

         // Ensure we have at most 3 letters and 4 numbers
         if (letters.length <= 3 && numbers.length <= 4) {
            setPlaneCode(letters + numbers);
         }
      }
   };

   const handleNextClick = () => {
      // Split the plane code into letters and numbers
      const match = planeCode.match(/^([A-Z]*)([0-9]*)$/);
      if (match) {
         setAirlineCode(match[1] || "");
         setFlightNumber(match[2] || "");
         setShowSplitInputs(true);
      }
   };

   const handleAirlineCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
      if (value.length <= 3) {
         setAirlineCode(value);
      }
   };

   const handleFlightNumberChange = (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const value = e.target.value.replace(/[^0-9]/g, "");
      if (value.length <= 4) {
         setFlightNumber(value);
      }
   };

   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFlightDate(e.target.value);
   };

   const handleDateInputClick = () => {
      setShowCalendar(true);
   };

   const handleDateSelect = (date: Date | undefined) => {
      if (date) {
         setSelectedDate(date);
         // Format date as MM/DD/YYYY
         const formatted = `${String(date.getMonth() + 1).padStart(
            2,
            "0"
         )}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear()}`;
         setFlightDate(formatted);
         setShowCalendar(false);
      }
   };

   const handleSearch = async () => {
      setIsSearching(true);

      // TODO: Replace with actual API call
      // const response = await fetch(`/api/flights?code=${airlineCode}${flightNumber}&date=${flightDate}`);
      // const data = await response.json();

      // Mock flight data for demonstration
      const mockFlights: Flight[] = [
         {
            id: "1",
            flightCode: `${airlineCode}${flightNumber}`,
            dateRange: flightDate,
            route: "San Francisco - Los Angeles",
            airports: "SFO - LAX",
            boardingTime: "10:00 AM",
            departureTime: "10:30 AM",
            arrivalTime: "12:00 PM",
         },
         {
            id: "2",
            flightCode: `${airlineCode}${flightNumber}`,
            dateRange: flightDate,
            route: "San Francisco - Los Angeles",
            airports: "SFO - LAX",
            boardingTime: "1:45 PM",
            departureTime: "2:15 PM",
            arrivalTime: "3:40 PM",
         },
      ];

      // Simulate API delay
      setTimeout(() => {
         setFlights(mockFlights);
      }, 500);
   };

   const handleClear = () => {
      setIsSearching(false);
      setFlights([]);
      setAirlineCode("");
      setFlightNumber("");
      setFlightDate("");
      setSelectedDate(undefined);
      setShowSplitInputs(false);
      setPlaneCode("");
      setIsInputFocused(false);
   };

   const handleFlightExpand = (flightId: string) => {
      // Toggle expansion - if clicking the same card, collapse it, otherwise expand the new one
      setExpandedFlightId(expandedFlightId === flightId ? null : flightId);
   };

   const handleFlightSelect = (flight: Flight) => {
      console.log("Selected flight:", flight);
      // Navigate to flight preferences screen with flight data
      onNavigate("flightPreferences", flight);
   };

   return (
      <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
         {/* Main Content - Scrollable */}
         <div className="flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] pt-[80px] px-[10px] w-full">
               {/* Header */}
               <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
                  <p className="leading-none" style={{ fontWeight: 600 }}>
                     Hello {firstName}
                  </p>
               </div>

               {/* Form Fields */}

               {!isInputFocused ? (
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
                     <Input
                        type="search"
                        placeholder="Search for flight"
                        icon={
                           <span className="material-symbols-outlined text-[24px]">
                              search
                           </span>
                        }
                        onFocus={() => setIsInputFocused(true)}
                     />
                  </div>
               ) : !showSplitInputs ? (
                  <div className="content-stretch flex flex-row gap-[16px] items-start relative w-full">
                     <Input
                        type="text"
                        placeholder="Plane code (e.g. WN123)"
                        value={planeCode}
                        onChange={handlePlaneCodeChange}
                        autoFocus
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                     />
                     <Button
                        className="w-1/4 mt-4"
                        onClick={handleNextClick}
                        type="button"
                     >
                        Next
                     </Button>
                  </div>
               ) : (
                  <div className="content-stretch flex flex-row gap-[8px] items-center relative w-full">
                     <Input
                        type="text"
                        placeholder="WN"
                        value={airlineCode}
                        onChange={handleAirlineCodeChange}
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 w-auto flex-shrink-0"
                        style={{
                           width: `${Math.max(
                              airlineCode.length * 12 + 24,
                              60
                           )}px`,
                        }}
                     />
                     <Input
                        type="text"
                        placeholder="123"
                        value={flightNumber}
                        onChange={handleFlightNumberChange}
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 w-auto flex-shrink-0"
                        style={{
                           width: `${Math.max(
                              flightNumber.length * 12 + 24,
                              60
                           )}px`,
                        }}
                     />
                     <Input
                        type="text"
                        placeholder="MM/DD/YYYY"
                        value={flightDate}
                        onChange={handleDateChange}
                        onClick={handleDateInputClick}
                        readOnly
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 cursor-pointer"
                     />
                     <Button
                        size={null}
                        variant={isSearching ? "ghost" : "default"}
                        className="mt-4 w-auto flex-shrink-0 px-[12px] py-[10px]"
                        onClick={isSearching ? handleClear : handleSearch}
                     >
                        {isSearching ? "Clear" : "Search"}
                     </Button>
                  </div>
               )}

               {/* Flight Results */}
               {flights.length > 0 && (
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full ">
                     {flights.map((flight) => (
                        <FlightResultCard
                           key={flight.id}
                           flight={flight}
                           isExpanded={expandedFlightId === flight.id}
                           onExpand={handleFlightExpand}
                           onSelect={handleFlightSelect}
                        />
                     ))}
                  </div>
               )}
            </div>
         </div>
         <BottomNavigation currentScreen="ride" onNavigate={onNavigate} />

         <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
            <DialogContent className="w-1/2 border-2 border-accent rounded-[12px] ">
               <div className="flex justify-center pt-[40px] rounded-[12px]">
                  <Calendar
                     className="rounded-[12px]"
                     selected={selectedDate}
                     onSelect={handleDateSelect}
                  />
               </div>
            </DialogContent>
         </Dialog>
      </div>
   );
}
