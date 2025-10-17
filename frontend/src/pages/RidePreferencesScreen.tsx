// Contributors: Michelle

import { useState } from "react";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { BottomNavigation } from "../components/layout/BottomNavigation";
import type { Flight as MockFlight } from "@/mock/mockFlights.ts";
import type { Screen } from "@/types/index.ts";

interface RidePreferencesScreenProps {
  onNavigate: (screen: Screen, planeCode?: string, date?: string, payload?: any) => void;
  flight: MockFlight;
}

export function RidePreferencesScreen({ onNavigate, flight }: RidePreferencesScreenProps) {
  const [earliestBefore, setEarliestBefore] = useState("30");
  const [latestBefore, setLatestBefore] = useState("60");
  const [numCarryOn, setNumCarryOn] = useState("1");
  const [numChecked, setNumChecked] = useState("0");
  const [pickupLocation, setPickupLocation] = useState("");

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

  const computeTime = (minutesBefore: string) => {
    const boardingTime = parseFlightTime(flight.boarding);
    const mins = parseInt(minutesBefore) || 0;
    boardingTime.setMinutes(boardingTime.getMinutes() - mins);
    return boardingTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex flex-col gap-6 pb-40 pt-6 px-0 w-full">
          {/* Back button */}
          <Button onClick={() => onNavigate("flightResults")}>Back</Button>

          {/* Flight info */}
          <div className="bg-zinc-900 p-4 rounded-xl flex flex-col gap-2 border border-zinc-700">
            <p className="font-bold text-lg">{flight.code}</p>
            <p>{flight.from} → {flight.to}</p>
            <p>Boarding: {flight.boarding}</p>
            <p>Departure: {flight.launch}</p>
            <p>Landing: {flight.landing}</p>
          </div>

          {/* Timing */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Earliest before boarding (minutes)</p>
            <Input
              type="text"
              value={earliestBefore}
              onChange={(e) => setEarliestBefore(e.target.value.replace(/[^0-9]/g, ""))}
            />
            <p>Arrival time: {computeTime(earliestBefore)}</p>

            <p className="font-semibold">Latest before boarding (minutes)</p>
            <Input
              type="text"
              value={latestBefore}
              onChange={(e) => setLatestBefore(e.target.value.replace(/[^0-9]/g, ""))}
            />
            <p>Arrival time: {computeTime(latestBefore)}</p>
          </div>

          {/* Luggage */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Carry-on bags</p>
            <Input
              type="text"
              value={numCarryOn}
              onChange={(e) => setNumCarryOn(e.target.value.replace(/[^0-9]/g, ""))}
            />

            <p className="font-semibold">Checked bags</p>
            <Input
              type="text"
              value={numChecked}
              onChange={(e) => setNumChecked(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>

          {/* Pickup location */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Pickup location</p>
            <Input
              type="text"
              placeholder="Enter pickup address"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
          </div>

          {/* Search rideshare */}
          <Button
            className="mt-4"
            onClick={() => onNavigate("loading", undefined, undefined, flight)}
            // onClick={() => onNavigate("rideWithGroup", flight.code, flight.date, { flight, earliestBefore, latestBefore, numCarryOn, numChecked, pickupLocation })}
          >
            Search for Rideshare
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen="ride" onNavigate={(s) => onNavigate(s)} />
    </div>
  );
}
