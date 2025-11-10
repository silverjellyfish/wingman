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
            dateRange: "Dec 15, 2025",
            route: "Nashville to New York",
            airports: "BNA - JFK",
            boardingTime: "8:30 AM",
            departureTime: "9:00 AM",
            arrivalTime: "12:15 PM",
            destination: "New York",
         },
         pod: {
            id: "1",
            numPeople: 3,
            listPeopleIds: [
               {
                  firebaseUid: "abc123",
                  name: "Sarah Johnson",
                  phoneNumber: "615-555-0123",
               },
               {
                  firebaseUid: "def456",
                  name: "Michael Chen",
                  phoneNumber: "615-555-0124",
               },
               {
                  firebaseUid: "ghi789",
                  name: "Emily Rodriguez",
                  phoneNumber: "615-555-0125",
               },
            ],
            pickupTime: "7:00 AM",
            pickupLocation: "EBI Circle",
            dropoffLocation: "BNA Airport",
            location: "Vanderbilt Campus",
            numBigLuggage: 3,
            numSmallLuggage: 2,
         },
      },
   ];

   const pastTrips = [
      {
         flight: {
            id: "4",
            flightCode: "SW3456",
            dateRange: "Nov 10, 2025",
            route: "Nashville to Atlanta",
            airports: "BNA - ATL",
            boardingTime: "11:30 AM",
            departureTime: "12:00 PM",
            arrivalTime: "2:15 PM",
            destination: "Atlanta",
         },
         pod: {
            id: "4",
            numPeople: 3,
            listPeopleIds: [
               { firebaseUid: "abc890" },
               { firebaseUid: "def234" },
               { firebaseUid: "ghi567" },
            ],
            pickupTime: "10:00 AM",
            location: "Music Row",
            numBigLuggage: 2,
            numSmallLuggage: 2,
         },
      },
      {
         flight: {
            id: "5",
            flightCode: "AA7890",
            dateRange: "Oct 28, 2025",
            route: "Nashville to Dallas",
            airports: "BNA - DFW",
            boardingTime: "4:15 PM",
            departureTime: "4:45 PM",
            arrivalTime: "6:30 PM",
            destination: "Dallas",
         },
         pod: {
            id: "5",
            numPeople: 2,
            listPeopleIds: [
               { firebaseUid: "jkl345" },
               { firebaseUid: "mno678" },
            ],
            pickupTime: "2:45 PM",
            location: "Belle Meade",
            numBigLuggage: 1,
            numSmallLuggage: 1,
         },
      },
   ];
   return (
      <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6 overflow-y-scroll no-scrollbar">
         <div className="flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] pt-[80px] px-[10px] w-full">
               <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
                  <p className="leading-none" style={{ fontWeight: 600 }}>
                     Trip History
                  </p>
               </div>
               <div className="flex gap-[6px] p-[6px] rounded-[100px] bg-[#27272A]">
                  <Toggle
                     className="rounded-[100px] px-[12px] !font-semibold"
                     aria-label="Upcoming Trips View"
                     data-state={view === "upcoming" ? "on" : "off"}
                     onClick={() => setView("upcoming")}
                  >
                     Upcoming
                  </Toggle>
                  <Toggle
                     className="rounded-[100px] px-[12px] !font-semibold"
                     aria-label="Past Trips View"
                     data-state={view === "past" ? "on" : "off"}
                     onClick={() => setView("past")}
                  >
                     Past Trips
                  </Toggle>
               </div>
               <div className="w-full">
                  {view === "upcoming" ? (
                     upcomingFlights.map((trip, index) => (
                        <div
                           key={`upcoming-${trip.flight.id}-${index}`}
                           className="flex flex-col mb-[10px]"
                        >
                           <div className="pointer-events-none">
                              <FlightResultCard
                                 flight={trip.flight}
                                 isExpanded={false}
                                 onExpand={() => {}}
                                 onSelect={() => {}}
                              />
                           </div>
                           <div className="border-t-5 border-dashed border-[#27272a] w-[90%] self-center" />
                           <ExpandedPodCard
                              flight={trip.flight}
                              pod={trip.pod}
                           />
                        </div>
                     ))
                  ) : view === "past" ? (
                     pastTrips.map((trip, index) => (
                        <div
                           key={`past-${trip.flight.id}-${index}`}
                           className="mb-[10px]"
                        >
                           <PriorTripCard flight={trip.flight} pod={trip.pod} />
                        </div>
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
