// Contributors: Samantha, Michelle
// Time: 0.5 hours

// TODO: CACHE THIS INFO SO IT DOESN'T HAVE TO KEEP FETCHING
import { FlightResultCard } from "@/components/FlightResultCard";
import { ExpandedPodCard } from "@/components/ExpandedPodCard";
import { PriorTripCard } from "@/components/PriorTripCard";
import type { Screen } from "@/types/index.ts";
import { Toggle } from "@/components/ui/toggle";
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import "@/pages/styles/LoadingScreen.css";
import { CalendarClock, Archive } from "lucide-react";
import { toast } from "sonner";

interface TripScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface PodMemberUser {
  // id: string;
  firebaseUid: string;
  name: string;
  phone?: string;
}

interface PodLocation {
  name: string;
}

interface PodApiData {
  _id: string;
  pickup_time: string;

  pickup_location: PodLocation;
  dropoff_location: PodLocation;

  members: {
    user: PodMemberUser;
    status: "pending" | "accepted" | "rejected";
    flightCode: string;
    flightDate: string;
    origin: string;
    destination: string;
  }[];
  num_big_luggage: number;
  num_small_luggage: number;
}

interface GroupMember {
  firebaseUid: string;
  id: number;
  name: string;
  phoneNumber: string;
}

interface TripPod {
  id: string;
  numPeople: number;
  listPeopleIds: GroupMember[];
  pickupTime: string;
  location: string;
  dropoffLocation: string;
  numBigLuggage: number;
  numSmallLuggage: number;
}

interface Flight {
  id: string;
  flightCode: string;
  dateRange: string;
  route: string;
  airports: string;
  boardingTime?: string;
  departureTime?: string;
  arrivalTime?: string;
  destination?: string;
}

interface Trip {
  flight: Flight;
  pod: TripPod;
}

/**
 * Formats an ISO 8601 date string to a readable time and date string.
 */
const formatTripDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return { time: formattedTime, date: formattedDate };
};
export function TripScreen({ onNavigate }: TripScreenProps) {
  const { user } = useAuth();
  const [view, setView] = useState<"upcoming" | "past">("upcoming");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchPods = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/pods/user/${user.id}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch pods");
        }
        const pods: PodApiData[] = await res.json();

        const tripsData: Trip[] = pods.map((pod) => {
          const pickupDate = new Date(pod.pickup_time);
          const { time: pickupTimeFormatted, date: pickupDateFormatted } =
            formatTripDateTime(pod.pickup_time);

          const currentUserMember = pod.members.find(
            (m) => m.user.firebaseUid === user.id
          );
          const memberFlightCode = currentUserMember?.flightCode || "N/A";
          const memberOrigin = currentUserMember?.origin || "N/A";
          const memberDestination =
            currentUserMember?.destination ||
            pod.dropoff_location.name ||
            "N/A";
          const memberFlightDate =
            currentUserMember?.flightDate || pickupDateFormatted;

          const listPeopleIds: GroupMember[] = pod.members.map((m, idx) => ({
            firebaseUid: m.user.firebaseUid,
            id: idx,
            name: m.user.name,
            phoneNumber: m.user.phone || "",
          }));
          const transformedPod: TripPod = {
            id: pod._id,
            numPeople: pod.members.length,
            listPeopleIds: listPeopleIds,
            pickupTime: pod.pickup_time,
            location: pod.pickup_location.name,
            dropoffLocation: pod.dropoff_location.name,
            numBigLuggage: pod.num_big_luggage,
            numSmallLuggage: pod.num_small_luggage,
          };

          const flight: Flight = {
            id: pod._id,
            flightCode: memberFlightCode,
            dateRange: memberFlightDate,
            route: `${memberOrigin} → ${memberDestination}`,
            airports: `${memberOrigin} - ${memberDestination}`,
            boardingTime: pickupTimeFormatted,
            departureTime: pickupTimeFormatted,
            arrivalTime: pickupTimeFormatted,
            destination: memberDestination,
          };

          return { flight, pod: transformedPod };
        });

        setTrips(tripsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPods();
  }, [user, refreshFlag]);

  const now = new Date();
  const upcomingTrips = trips.filter((t) => new Date(t.pod.pickupTime) >= now);
  const pastTrips = trips.filter((t) => new Date(t.pod.pickupTime) < now);

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
            {loading ? (
              <div />
            ) : view === "upcoming" ? (
              upcomingTrips.length > 0 ? (
                upcomingTrips.map((trip, idx) => (
                  <div
                    key={trip.pod.id || idx}
                    className="flex flex-col mb-[10px]"
                  >
                    <FlightResultCard
                      flight={{
                        ...trip.flight,
                        boardingTime: trip.flight.boardingTime || "",
                        departureTime: trip.flight.departureTime || "",
                        arrivalTime: trip.flight.arrivalTime || "",
                      }}
                      isExpanded={false}
                      onExpand={() => {}}
                      onSelect={() => {}}
                    />
                    <div className="border-t-5 border-dashed border-[#27272a] w-[90%] self-center" />
                    <ExpandedPodCard
                      flight={{
                        ...trip.flight,
                        boardingTime: trip.flight.boardingTime || "",
                        departureTime: trip.flight.departureTime || "",
                        arrivalTime: trip.flight.arrivalTime || "",
                        destination: trip.flight.destination || "Unknown",
                        route: trip.flight.route || "",
                        airports: trip.flight.airports || "",
                      }}
                      pod={trip.pod}
                      onLeave={() => {
                        toast.success("Successfully left pod.");
                        setRefreshFlag(!refreshFlag);
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-[15rem] flex-col">
                  <CalendarClock className="w-13 h-13 text-gray-400 mb-[1rem]" />
                  <p className="text-gray-400 text-center">
                    No upcoming trips.
                  </p>
                </div>
              )
            ) : pastTrips.length > 0 ? (
              pastTrips.map((trip) => (
                <PriorTripCard
                  key={trip.pod.id}
                  flight={{
                    ...trip.flight,
                    boardingTime: trip.flight.boardingTime || "",
                    departureTime: trip.flight.departureTime || "",
                    arrivalTime: trip.flight.arrivalTime || "",
                    destination: trip.flight.destination || "Unknown",
                  }}
                  pod={trip.pod}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-[15rem] flex-col">
                <Archive className="w-13 h-13 text-gray-400 mb-[1rem]" />
                <p className="text-gray-400 text-center">No past trips.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
