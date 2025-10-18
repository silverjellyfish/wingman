import { useState } from "react";

interface FlightResultCardProps {
   flight: {
      id: string;
      flightCode: string;
      dateRange: string;
      route: string;
      airports: string;
      boardingTime: string;
      departureTime: string;
      arrivalTime: string;
   };
   isExpanded: boolean;
   onExpand: (flightId: string) => void;
   onSelect: (flight: FlightResultCardProps["flight"]) => void;
}

export function FlightResultCard({ flight, isExpanded, onExpand, onSelect }: FlightResultCardProps) {
   const [isHovered, setIsHovered] = useState(false);

   const handleCardClick = () => {
      onExpand(flight.id);
   };

   const handleSelectClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect(flight);
   };

   return (
      <div
         className="box-border content-stretch flex flex-col items-start p-[12px] relative rounded-[16px] shrink-0 w-full cursor-pointer transition-all text-white"
         style={{
            backgroundColor: isHovered ? "#3f3f47" : "#27272A",
            gap: isExpanded ? "16px" : "16px",
         }}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         onClick={handleCardClick}
      >
         {/* Flight Header and Date */}
         <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
            {/* Flight Code and Date Range */}
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
               {/* Flight Code */}
               <p className="leading-none relative text-[16px] text-neutral-50 text-nowrap tracking-[0.08px]" style={{ fontWeight: 700 }}>
                  {flight.flightCode}
               </p>

               {/* Date Range */}
               <p className="font-['Geist:Medium',_sans-serif] font-medium leading-none relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px] whitespace-pre">
                  {flight.dateRange}
               </p>
            </div>

            {/* Route and Airport Codes */}
            <div className="content-stretch flex font-['Geist:Medium',_sans-serif] font-medium items-center justify-between leading-none relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px] w-full whitespace-pre">
               <p className="relative shrink-0">{flight.route}</p>
               <p className="relative shrink-0">{flight.airports}</p>
            </div>

            {/* Times */}
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
               {/* Boarding Time */}
               <div className="content-stretch flex items-center gap-[4px] relative shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-neutral-50">
                     login
                  </span>
                  <p className="leading-none relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px] whitespace-pre" style={{ fontWeight: 700 }}>
                     {flight.boardingTime}
                  </p>
               </div>

               {/* Departure Time */}
               <div className="content-stretch flex items-center gap-[4px] relative shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-neutral-50">
                     flight_takeoff
                  </span>
                  <p className="leading-none relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px] whitespace-pre" style={{ fontWeight: 700 }}>
                     {flight.departureTime}
                  </p>
               </div>

               {/* Arrival Time */}
               <div className="content-stretch flex items-center gap-[4px] relative shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-neutral-50">
                     flight_land
                  </span>
                  <p className="leading-none relative shrink-0 text-[14px] text-center text-neutral-50 text-nowrap tracking-[0.07px] whitespace-pre" style={{ fontWeight: 700 }}>
                     {flight.arrivalTime}
                  </p>
               </div>
            </div>
         </div>

         {/* Expanded Section - Select Button */}
         {isExpanded && (
            <button
               onClick={handleSelectClick}
               className="w-full font-['Geist:SemiBold',_sans-serif] font-semibold py-[12px] px-[16px] rounded-[8px] transition-colors text-[14px] tracking-[0.07px]"
               style={{
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
               }}
               onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E5E5E5';
               }}
               onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
               }}
            >
               Select this flight
            </button>
         )}
      </div>
   );
}
