"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarProps {
   className?: string;
   selected?: Date;
   onSelect?: (date: Date) => void;
}

function Calendar({ className, selected, onSelect }: CalendarProps) {
   const [currentMonth, setCurrentMonth] = React.useState(
      selected ? selected.getMonth() : new Date().getMonth()
   );
   const [currentYear, setCurrentYear] = React.useState(
      selected ? selected.getFullYear() : new Date().getFullYear()
   );
   const [selectedDate, setSelectedDate] = React.useState(
      selected ? selected.getDate() : new Date().getDate()
   );

   const daysInMonth = (month: number, year: number) => {
      return new Date(year, month + 1, 0).getDate();
   };

   const getFirstDayOfMonth = (month: number, year: number) => {
      return new Date(year, month, 1).getDay();
   };

   const handlePreviousMonth = () => {
      if (currentMonth === 0) {
         setCurrentMonth(11);
         setCurrentYear(currentYear - 1);
      } else {
         setCurrentMonth(currentMonth - 1);
      }
   };

   const handleNextMonth = () => {
      if (currentMonth === 11) {
         setCurrentMonth(0);
         setCurrentYear(currentYear + 1);
      } else {
         setCurrentMonth(currentMonth + 1);
      }
   };

   const handleDateSelect = (day: number) => {
      setSelectedDate(day);
      if (onSelect) {
         onSelect(new Date(currentYear, currentMonth, day));
      }
   };

   const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];

   const renderCalendar = () => {
      const totalDays = daysInMonth(currentMonth, currentYear);
      const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
      const prevMonthDays = daysInMonth(currentMonth - 1, currentYear);

      const days = [];

      // Previous month's days
      for (let i = firstDay - 1; i >= 0; i--) {
         days.push(
            <div
               key={`prev-${i}`}
               className="content-stretch flex flex-col items-center relative shrink-0 size-[36px]"
            >
               <div className="box-border content-stretch flex items-center justify-center opacity-50 px-[9px] py-[8px] relative rounded-[6px] shrink-0 size-[36px]">
                  <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-zinc-400">
                     <p className="leading-[20px] whitespace-pre">
                        {prevMonthDays - i}
                     </p>
                  </div>
               </div>
            </div>
         );
      }

      // Current month's days
      for (let day = 1; day <= totalDays; day++) {
         const isSelected = day === selectedDate;
         days.push(
            <div
               key={`current-${day}`}
               className="content-stretch flex flex-col items-center relative shrink-0 size-[36px]"
            >
               <button
                  onClick={() => handleDateSelect(day)}
                  className={`box-border content-stretch flex items-center justify-center px-[9px] py-[8px] relative rounded-[6px] shrink-0 size-[36px] cursor-pointer ${
                     isSelected ? "bg-neutral-50" : ""
                  }`}
               >
                  <div
                     className={`flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap ${
                        isSelected ? "text-zinc-900" : "text-neutral-50"
                     }`}
                  >
                     <p className="leading-[20px] whitespace-pre">{day}</p>
                  </div>
               </button>
            </div>
         );
      }

      // Next month's days
      const remainingCells = 42 - days.length; // 6 rows * 7 days
      for (let day = 1; day <= remainingCells; day++) {
         days.push(
            <div
               key={`next-${day}`}
               className="content-stretch flex flex-col items-center relative shrink-0 size-[36px]"
            >
               <div className="box-border content-stretch flex items-center justify-center opacity-50 px-[15.3px] py-[8px] relative rounded-[6px] shrink-0 size-[36px]">
                  <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-zinc-400">
                     <p className="leading-[20px] whitespace-pre">{day}</p>
                  </div>
               </div>
            </div>
         );
      }

      return days;
   };

   return (
      <div className={cn("p-3 bg-background", className)}>
         {/* Header with month/year and navigation */}
         <div className="flex items-center justify-between mb-4">
            <button
               onClick={handlePreviousMonth}
               className="p-2 hover:bg-accent rounded-md"
            >
               <ChevronLeftIcon className="size-4" />
            </button>
            <div className="text-sm font-medium">
               {monthNames[currentMonth]} {currentYear}
            </div>
            <button
               onClick={handleNextMonth}
               className="p-2 hover:bg-accent rounded-md"
            >
               <ChevronRightIcon className="size-4" />
            </button>
         </div>

         {/* Weekday headers */}
         <div className="grid grid-cols-7 gap-0 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
               <div
                  key={day}
                  className="flex items-center justify-center text-muted-foreground text-[0.8rem] font-normal size-[36px]"
               >
                  {day}
               </div>
            ))}
         </div>

         {/* Calendar grid */}
         <div className="grid grid-cols-7 gap-0">{renderCalendar()}</div>
      </div>
   );
}

export { Calendar };
