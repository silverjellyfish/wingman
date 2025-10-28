// Contributors: Vince, Michelle
// Time: 0.5 hours

import { useState } from "react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Dialog, DialogContent } from "@/components/ui/dialog.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { useAuth } from "@/contexts/AuthContext";
import type { Screen } from "@/types/index.ts";

interface FlightInputScreenProps {
   onNavigate: (screen: Screen, planeCode?: string, date?: string) => void;
   planeCode: string;
}

export function FlightInputScreen({
   onNavigate,
   planeCode,
}: FlightInputScreenProps) {
   const { user } = useAuth();
   const firstName = user?.name?.split(" ")[0] || "there";

   const [isInputFocused, setIsInputFocused] = useState(false);
   const [showSplitInputs, setShowSplitInputs] = useState(false);
   const [localPlaneCode, setLocalPlaneCode] = useState(planeCode || "");
   const [airlineCode, setAirlineCode] = useState("");
   const [flightNumber, setFlightNumber] = useState("");
   const [flightDate, setFlightDate] = useState("");
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      undefined
   );
   const [showCalendar, setShowCalendar] = useState(false);
   const [isSearching, setIsSearching] = useState(false);

   // Handle plane code change
   const handlePlaneCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalPlaneCode(e.target.value.toUpperCase());
   };

   // Handle airline code change
   const handleAirlineCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase();
      if (value.length <= 2) {
         setAirlineCode(value);
      }
   };

   // Handle flight number change
   const handleFlightNumberChange = (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const value = e.target.value;
      if (/^\d{0,4}$/.test(value)) {
         setFlightNumber(value);
      }
   };

   // Handle date change
   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFlightDate(e.target.value);
   };

   // Handle date input click
   const handleDateInputClick = () => {
      setShowCalendar(true);
   };

   // Handle date selection from calendar
   const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date);
      if (date) {
         // Format as YYYY-MM-DD to match mockFlights.ts format
         const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
         )}-${String(date.getDate()).padStart(2, "0")}`;
         setFlightDate(formattedDate);
      }
      setShowCalendar(false);
   };

   // Handle next click
   const handleNextClick = () => {
      if (!/^([A-Z]{2})(\d{1,4})$/i.test(localPlaneCode)) {
         alert("Enter valid plane code (e.g., WN123)");
         return;
      }
      const match = localPlaneCode.match(/^([A-Z]{2})(\d{1,4})$/i);
      if (match) {
         setAirlineCode(match[1]);
         setFlightNumber(match[2]);
         setShowSplitInputs(true);
      }
   };

   // Handle search
   const handleSearch = () => {
      if (!airlineCode || !flightNumber) {
         alert("Enter airline code and flight number");
         return;
      }
      if (!flightDate) {
         alert("Select a date");
         return;
      }
      const fullPlaneCode = `${airlineCode}${flightNumber}`;
      setIsSearching(true);
      onNavigate("flightResults", fullPlaneCode, flightDate);
   };

   // Handle clear
   const handleClear = () => {
      setIsInputFocused(false);
      setShowSplitInputs(false);
      setLocalPlaneCode("");
      setAirlineCode("");
      setFlightNumber("");
      setFlightDate("");
      setSelectedDate(undefined);
      setIsSearching(false);
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
                        value={localPlaneCode}
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
                        placeholder="YYYY-MM-DD"
                        value={flightDate}
                        onChange={handleDateChange}
                        onClick={handleDateInputClick}
                        // readOnly
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
            </div>
         </div>

         <BottomNavigation currentScreen="ride" onNavigate={onNavigate} />

         <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
            <DialogContent className="w-2/3 max-w-[300px] border-2 border-accent rounded-[12px]">
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
