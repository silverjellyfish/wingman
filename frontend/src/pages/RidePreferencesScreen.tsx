// Contributors: Michelle

import { useState } from "react";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { BottomNavigation } from "../components/layout/BottomNavigation";
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
  const [earliestTime, setEarliestTime] = useState("");
  const [latestTime, setLatestTime] = useState("");
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

  const boardingTime = parseFlightTime(flight.boarding);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleLatestTimeChange = (val: string) => {
    setLatestTime(val);
    const [h, m] = val.split(":").map(Number);
    const selected = new Date();
    selected.setHours(h, m, 0, 0);
    if (selected > boardingTime) {
      alert("Latest boarding time cannot be after flight boarding time");
      setLatestTime(formatTime(boardingTime));
    }
  };

  return (
    <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Button
          variant="back"
          className="mt-[1rem] pl-[2vw] pr-[2vw]"
          onClick={() => onNavigate("flightResults", flight.code, flight.date)}
        >
          Back
        </Button>
        <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] pt-[80px] px-[40px] w-full">
          <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
            <p className="leading-none" style={{ fontWeight: 600 }}>
              Ride Details
            </p>
          </div>
          {/* Flight info */}
          <div className="flex flex-col space-between p-[12px] bg-[#566957] rounded-[20px] mt-[1rem]">
            <div className="flex flex-row justify-between items-center">
              <p className="text-xl" style={{ fontWeight: 600 }}>
                {flight.code}
              </p>
              <p className="text-gray-400 text-sm" style={{ fontWeight: 600 }}>
                {flight.date}
              </p>
            </div>
            <div className="flex justify-between text-white/80">
              <p>
                <span className="font-semibold">{flight.from}</span> →{" "}
                <span className="font-semibold">{flight.to}</span>
              </p>
            </div>
            <div className="grid grid-cols-3 text-sm text-gray-400 gap-2">
              <p style={{ fontWeight: 600 }}>Launch: {flight.launch}</p>
              <p style={{ fontWeight: 600 }}>Landing: {flight.landing}</p>
              <p style={{ fontWeight: 600 }}>Boarding: {flight.boarding}</p>
            </div>
          </div>
          <div className="flex flex-row gap-[1rem] w-full items-center">
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p style={{ fontWeight: 600 }}>Earliest Arrival</p>
              <Input
                type="time"
                value={earliestTime}
                onChange={(e) => setEarliestTime(e.target.value)}
              />
            </div>

            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p style={{ fontWeight: 600 }}>Latest Arrival</p>
              <Input
                type="time"
                value={latestTime}
                onChange={(e) => handleLatestTimeChange(e.target.value)}
              />
            </div>
          </div>
          {/* Earliest and Latest boarding times */}
          {/* <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
            <p
              className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
              style={{ fontWeight: 600 }}
            >
              Earliest boarding time
            </p>
            <Input
              type="time"
              value={earliestTime}
              onChange={(e) => setEarliestTime(e.target.value)}
            />

            <p
              className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
              style={{ fontWeight: 600 }}
            >
              Latest boarding time
            </p>
            <Input
              type="time"
              value={latestTime}
              onChange={(e) => handleLatestTimeChange(e.target.value)}
            />
          </div> */}
          <div className="flex flex-row gap-[1rem] w-full items-center">
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p style={{ fontWeight: 600 }}># Carry-on(s)</p>
              <Input
                type="text"
                value={numCarryOn}
                onChange={(e) =>
                  setNumCarryOn(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p style={{ fontWeight: 600 }}># Checked-in(s)</p>
              <Input
                type="text"
                value={numChecked}
                onChange={(e) =>
                  setNumChecked(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
            </div>
          </div>

          {/* <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
            <p
              className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
              style={{ fontWeight: 600 }}
            >
              Carry-on bags
            </p>
            <Input
              type="text"
              value={numCarryOn}
              onChange={(e) =>
                setNumCarryOn(e.target.value.replace(/[^0-9]/g, ""))
              }
            />

            <p
              className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
              style={{ fontWeight: 600 }}
            >
              Checked bags
            </p>
            <Input
              type="text"
              value={numChecked}
              onChange={(e) =>
                setNumChecked(e.target.value.replace(/[^0-9]/g, ""))
              }
            />
          </div> */}

          {/* Pickup location */}
          <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
            <p style={{ fontWeight: 600 }}>Pickup location</p>
            <Input
              type="text"
              placeholder="Enter pickup address"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
          </div>

          {/* Search rideshare */}
          <Button
            className="pl-[2vw] pr-[2vw]"
            onClick={() =>
              onNavigate("loading", undefined, undefined, {
                flight,
                earliestTime,
                latestTime,
                numCarryOn,
                numChecked,
                pickupLocation,
              })
            }
          >
            Search for Rideshare
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        currentScreen="ride"
        onNavigate={(s) => onNavigate(s)}
      />
    </div>
  );
}
