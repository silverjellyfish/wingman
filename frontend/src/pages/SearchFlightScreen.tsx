// Contributors: Michelle
// Time: 0.5 hours
// TODO: Connect this with backend.

import { useState } from "react";
import { BottomNavigation } from "@/components/layout/BottomNavigation.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import type { Screen } from "@/types/index.ts";

interface FlightInputScreenProps {
  onNavigate: (screen: Screen, planeCode?: string, date?: string) => void;
  planeCode: string;
}

export function FlightInputScreen({
  onNavigate,
  planeCode,
}: FlightInputScreenProps) {
  const match = planeCode.match(/^([A-Z]{2})(\d{1,4})$/i);
  const airline = match ? match[1] : "";
  const flightNumber = match ? match[2] : "";

  const [selectedDate, setSelectedDate] = useState("");

  // Handle plane search
  const handleSearch = () => {
    if (!selectedDate) {
      alert("Select a date");
      return;
    }
    onNavigate("flightResults", planeCode, selectedDate);
  };

  return (
    <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
      <div className="flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Button
          variant="back"
          className="mt-[1rem] pl-[2vw] pr-[2vw]"
          onClick={() => onNavigate("ride")}
        >
          Back
        </Button>
        <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] pt-[80px] px-[40px] w-full">
          <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
            <p className="leading-none" style={{ fontWeight: 600 }}>
              Search Flight
            </p>
          </div>

          <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
            <Input
              type="text"
              value={airline}
              readOnly
              className="bg-zinc-800 text-white"
            />
            <Input
              type="text"
              value={flightNumber}
              readOnly
              className="bg-zinc-800 text-white"
            />
          </div>

          {/* Date input */}
          <div className="flex flex-row gap-4 w-full items-center">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <Button onClick={handleSearch} className="pl-[2vw] pr-[2vw]">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomNavigation currentScreen="ride" onNavigate={onNavigate} />
    </div>
  );
}
