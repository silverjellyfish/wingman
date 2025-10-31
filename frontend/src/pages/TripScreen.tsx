// Contributors: Samantha
// Time: 0.5 hours

import { FlightResultCard } from "@/components/FlightResultCard";
import { ExpandedPodCard } from "@/components/ExpandedPodCard";
import { PriorTripCard } from "@/components/PriorTripCard";
import type { Screen } from "@/types/index.ts";
import { Toggle } from "@/components/ui/toggle";
import React from "react";

interface TripScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function TripScreen({ onNavigate }: TripScreenProps) {
  const [view, setView] = React.useState<"upcoming" | "past">("upcoming");

  // TODO: Change this from mocked to backend data
  const upcomingFlights = [
    {
      flight: {
        id: "1",
        flightCode: "AA1234",
        dateRange: "Nov 1, 2025",
        route: "temp",
        airports: "BNA",
        boardingTime: "10:00 AM",
        departureTime: "10:30 AM",
        arrivalTime: "12:30 PM",
        destination: "New York",
      },
      pod: {
        id: "2",
        numPeople: 4,
        listPeopleIds: [
          { firebaseUid: "abc123", name: "Alice", phoneNumber: "123-456-7890" },
          { firebaseUid: "def456", name: "Bob", phoneNumber: "987-654-3210" },
          {
            firebaseUid: "ghi789",
            name: "Charlie",
            phoneNumber: "555-555-5555",
          },
        ],
        pickupTime: "9:00 AM",
        pickupLocation: "ebi circle",
        dropoffLocation: "JFK Airport",
        location: "rand circle",
        numBigLuggage: 2,
        numSmallLuggage: 1,
      },
    },
    {
      flight: {
        id: "1",
        flightCode: "AA1234",
        dateRange: "Nov 1, 2025",
        route: "temp",
        airports: "BNA",
        boardingTime: "10:00 AM",
        departureTime: "10:30 AM",
        arrivalTime: "12:30 PM",
        destination: "New York",
      },
      pod: {
        id: "2",
        numPeople: 4,
        listPeopleIds: [
          { firebaseUid: "abc123", name: "Alice", phoneNumber: "123-456-7890" },
          { firebaseUid: "def456", name: "Bob", phoneNumber: "987-654-3210" },
          {
            firebaseUid: "ghi789",
            name: "Charlie",
            phoneNumber: "555-555-5555",
          },
        ],
        pickupTime: "9:00 AM",
        pickupLocation: "ebi circle",
        dropoffLocation: "JFK Airport",
        location: "rand circle",
        numBigLuggage: 2,
        numSmallLuggage: 1,
      },
    },
    {
      flight: {
        id: "1",
        flightCode: "AA1234",
        dateRange: "Nov 1, 2025",
        route: "temp",
        airports: "BNA",
        boardingTime: "10:00 AM",
        departureTime: "10:30 AM",
        arrivalTime: "12:30 PM",
        destination: "New York",
      },
      pod: {
        id: "2",
        numPeople: 4,
        listPeopleIds: [
          { firebaseUid: "abc123", name: "Alice", phoneNumber: "123-456-7890" },
          { firebaseUid: "def456", name: "Bob", phoneNumber: "987-654-3210" },
          {
            firebaseUid: "ghi789",
            name: "Charlie",
            phoneNumber: "555-555-5555",
          },
        ],
        pickupTime: "9:00 AM",
        pickupLocation: "ebi circle",
        dropoffLocation: "JFK Airport",
        location: "rand circle",
        numBigLuggage: 2,
        numSmallLuggage: 1,
      },
    },
  ];

  const pastTrips = [
    {
      flight: {
        id: "1",
        flightCode: "AA1234",
        dateRange: "Dec 1, 2025",
        route: "temp",
        airports: "BNA",
        boardingTime: "12:00 AM",
        departureTime: "12:30 AM",
        arrivalTime: "2:30 PM",
        destination: "New York",
      },
      pod: {
        id: "2",
        numPeople: 4,
        listPeopleIds: [
          { firebaseUid: "abc123" },
          { firebaseUid: "def456" },
          { firebaseUid: "ghi789" },
        ],
        // pick_or_drop_time? what did we decide about this?
        location: "ebi circle",
        numBigLuggage: 2,
        numSmallLuggage: 1,
      },
    },
  ];
  return (
    <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
      <div className="flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] pt-[80px] px-[40px] w-full">
          <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
            <p className="leading-none" style={{ fontWeight: 600 }}>
              Trip History
            </p>
          </div>
          <div className="flex gap-[7px] p-[3px] rounded-[16px] bg-[#27272A]">
            <Toggle
              className="rounded-[16px] p-[3px] px-[8px]"
              aria-label="Upcoming Trips View"
              data-state={view === "upcoming" ? "on" : "off"}
              onClick={() => setView("upcoming")}
            >
              Upcoming
            </Toggle>
            <Toggle
              className="rounded-[16px] p-[3px] px-[8px]"
              aria-label="Past Trips View"
              data-state={view === "past" ? "on" : "off"}
              onClick={() => setView("past")}
            >
              Past Trips
            </Toggle>
          </div>
          <div className="w-full">
            {view === "upcoming" ? (
              upcomingFlights.map((trip) => (
                <div className="mb-[10px]">
                  <div className="pointer-events-none">
                    <FlightResultCard
                      key={trip.flight.id}
                      flight={trip.flight}
                      isExpanded={false}
                      onExpand={() => {}}
                      onSelect={() => {}}
                    />
                  </div>
                  <ExpandedPodCard flight={trip.flight} pod={trip.pod} />
                </div>
              ))
            ) : view === "past" ? (
              pastTrips.map((trip) => (
                <PriorTripCard flight={trip.flight} pod={trip.pod} />
              ))
            ) : (
              <h3> neither upcoming or past trips! how can this be!</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
