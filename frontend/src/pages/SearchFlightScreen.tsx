// Contributors: Vince, Michelle
// Time: 0.5 hours

import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { useAuth } from "@/contexts/AuthContext";
import type { Screen } from "@/types/index.ts";

interface FlightInputScreenProps {
  onNavigate: (
    screen: Screen,
    planeCode?: string,
    date?: string,
    payload?: any
  ) => void;
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // 🛫 New states for departure/arrival IDs
  const [departureId, setDepartureId] = useState("");
  const [arrivalId, setArrivalId] = useState("");

  // ---------- Validation Helpers ----------
  const isValidAirportOrKgmid = (value: string): boolean => {
    if (!value) {
      return false;
    }
    return value
      .split(",")
      .every(
        (v) =>
          /^[A-Z]{3}$/.test(v.trim()) || /^\/[mM]\/[a-zA-Z0-9_]+$/i.test(v.trim())
      );
  };

  // ---------- Handlers ----------
  const handlePlaneCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPlaneCode(e.target.value.toUpperCase());
  };

  const handleAirlineCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 2) {
      setAirlineCode(value);
    }
  };

  const handleFlightNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setFlightNumber(value);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlightDate(e.target.value);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const formatted = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      setFlightDate(formatted);
    }
    setShowCalendar(false);
  };

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

  const handleSearch = () => {
    if (!airlineCode || !flightNumber) {
      alert("Enter airline code and flight number");
      return;
    }
    if (!flightDate) {
      alert("Select a date");
      return;
    }
    if (!isValidAirportOrKgmid(departureId)) {
      alert(
        "Invalid departure_id. Use 3-letter airport code or /m/... format."
      );
      return;
    }
    if (!isValidAirportOrKgmid(arrivalId)) {
      alert("Invalid arrival_id. Use 3-letter airport code or /m/... format.");
      return;
    }

    const fullPlaneCode = `${airlineCode}${flightNumber}`;
    setIsSearching(true);
    onNavigate("flightResults", fullPlaneCode, flightDate, {
      departureId,
      arrivalId,
    });
  };

  const handleClear = () => {
    setIsInputFocused(false);
    setShowSplitInputs(false);
    setLocalPlaneCode("");
    setAirlineCode("");
    setFlightNumber("");
    setFlightDate("");
    setSelectedDate(undefined);
    setIsSearching(false);
    setDepartureId("");
    setArrivalId("");
  };

  // ---------- UI ----------
  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-6">
      <div className="flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] pt-[80px] px-[10px] w-full">
          <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
            <p className="leading-none font-semibold">Hello {firstName}</p>
          </div>

          {/* Search Field */}
          {!isInputFocused ? (
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
          ) : !showSplitInputs ? (
            <div className="flex gap-[16px] w-full">
              <Input
                type="text"
                placeholder="Plane code (e.g. WN123)"
                value={localPlaneCode}
                onChange={handlePlaneCodeChange}
                autoFocus
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
            <div className="flex flex-col gap-[12px] w-full">
              {/* Airline + Flight + Date */}
              <div className="flex gap-[8px] items-center">
                <Input
                  type="text"
                  placeholder="WN"
                  value={airlineCode}
                  onChange={handleAirlineCodeChange}
                  className="w-[70px]"
                />
                <Input
                  type="text"
                  placeholder="123"
                  value={flightNumber}
                  onChange={handleFlightNumberChange}
                  className="w-[80px]"
                />
                <Input
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={flightDate}
                  onChange={handleDateChange}
                  onClick={() => setShowCalendar(true)}
                  className="flex-1 cursor-pointer"
                />
              </div>

              {/* 🛫 New Departure & Arrival Inputs */}
              <div className="flex gap-[8px] items-center">
                <Input
                  type="text"
                  placeholder="Departure (e.g. JFK)"
                  value={departureId}
                  onChange={(e) => setDepartureId(e.target.value.toUpperCase())}
                />
                <Input
                  type="text"
                  placeholder="Arrival (e.g. LAX)"
                  value={arrivalId}
                  onChange={(e) => setArrivalId(e.target.value.toUpperCase())}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-[8px]">
                <Button
                  size={null}
                  variant={isSearching ? "ghost" : "default"}
                  className="px-[12px] py-[10px]"
                  onClick={isSearching ? handleClear : handleSearch}
                >
                  {isSearching ? "Clear" : "Search"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Calendar Dialog */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="w-2/3 max-w-[300px] border-2 border-accent rounded-[12px]">
          <DialogHeader>
            <DialogTitle />
            <DialogDescription className="mt-[1rem] mb-[1rem]">
              Select Flight Date
            </DialogDescription>
            <DialogDescription />
          </DialogHeader>
          <div className="flex justify-center rounded-[12px]">
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
