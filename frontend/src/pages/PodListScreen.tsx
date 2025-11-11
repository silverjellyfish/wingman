// Contributors: Michelle
// Time: 2 hours

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { FlightResultCard } from "@/components/FlightResultCard";
import { GroupOptionCard } from "@/components/GroupOptionCard";
import { toast } from "sonner";
import type { NonUndefined } from "react-hook-form";

// TODO: WHEN USER ALEADY JOINED POD
// TODO: Consolidate these interfaces. Will be deleted later.
interface PodListScreenProps {
  onNavigate: (...args: any[]) => void;
  payload?: any;
}

interface User {
  _id: string;
  user: string;
  email: string;
  name: string;
  createdAt: string;
  gender?: string;
}

interface Pod {
  _id: string;
  num_members: number;
  members: User[];
  pickup_time: string;
  location: {
    _id: string;
    name: string;
    address: string;
    type: "airport" | "university" | "hotel" | "landmark";
  };
  num_big_luggage: number;
  num_small_luggage: number;
  created_at: string;
  updated_at: string;
}

function convertToMilitaryTime(timeStr: string): string {
  // Create a Date object. The specific date doesn't matter,
  // we just need it to parse the time string.
  const d = new Date(`2025/10/28 ${timeStr}`);

  // Extract the hours and minutes in 24-hour format
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function PodListScreen({
  onNavigate,
  payload = {},
}: PodListScreenProps) {
  const {
    flight = {},
    flights = [],
    earliestTime = "",
    latestTime = "",
    numCarryOn = 0,
    numChecked = 0,
    pickupLocation = "",
    genderPreference = null,
  } = payload;

  const [pods, setPods] = useState<Pod[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [mongoId, setMongoId] = useState<string | null>(null);
  const [isUserIdLoading, setIsUserIdLoading] = useState(true);

  const [joinedPods, setJoinedPods] = useState<Set<string>>(new Set());

  const charToSplit = [":", " "];
  const regex = new RegExp(`[${charToSplit.join("")}]`, "g");

  const handleAccept = async (podId: string) => {
    if (!user) return;

    // Optimistic UI update
    setJoinedPods((prev) => new Set(prev).add(podId));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/pods/${podId}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || res.statusText);
      }

      toast.success("Successfully joined the pod!");
    } catch (err) {
      console.error("Error joining pod:", err);
      toast.error("Failed to join pod");

      // Rollback if error
      setJoinedPods((prev) => {
        const next = new Set(prev);
        next.delete(podId);
        return next;
      });
    }
  };

  useEffect(() => {
    if (!user?.id) {
      setIsUserIdLoading(false);
      return;
    }

    const findMongoIdFromFirebase = async (firebaseUid: string) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/mongoid/${firebaseUid}`
        );
        if (!res.ok) {
          // Log error but proceed with null ID
          console.error("Failed to fetch Mongo ID");
          setMongoId(null);
        } else {
          const id = await res.json();
          setMongoId(id);
        }
      } catch (error) {
        console.error("Error fetching Mongo ID:", error);
        setMongoId(null);
      } finally {
        setIsUserIdLoading(false);
      }
    };

    // Only fetch if we haven't already or if user changes
    if (mongoId === null && isUserIdLoading) {
      findMongoIdFromFirebase(user.id);
    }
  }, [user, mongoId, isUserIdLoading]);

  useEffect(() => {
    if (!user || !flight?.date || isUserIdLoading) return;

    const fetchPods = async () => {
      setLoading(true);
      const startTime = Date.now();
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/pods/all`);
        if (!res.ok) throw new Error("Failed to fetch pods");

        const data: Pod[] = await res.json();

        const filtered = data.filter((pod) => {
          // Check if pod and flight date match
          const podDate = new Date(pod.pickup_time)
            .toLocaleString()
            .split(",")[0];
          const flightDate = new Date(flight.date).toISOString().split("T")[0];
          const flightArray = flightDate.split("-");
          const podArray = podDate.split("/");

          const sameDay =
            podArray[0] == flightArray[1] &&
            podArray[2] == flightArray[0] &&
            podArray[1] == flightArray[2];

          // Check if pod time is within boundaries set by user
          const podTime = new Date(pod.pickup_time);
          const splitTimeEarliest =
            convertToMilitaryTime(earliestTime).split(regex);
          const splitTimeLatest =
            convertToMilitaryTime(latestTime).split(regex);

          const [earliestHour, earliestMin] = [
            Number(splitTimeEarliest[0]),
            Number(splitTimeEarliest[1]),
          ];
          const [latestHour, latestMin] = [
            Number(splitTimeLatest[0]),
            Number(splitTimeLatest[1]),
          ];

          const earliest = new Date(podTime);
          earliest.setHours(earliestHour, earliestMin, 0, 0);

          const latest = new Date(podTime);
          latest.setHours(latestHour, latestMin, 0, 0);

          const withinTime = podTime >= earliest && podTime <= latest;

          // Check if user pickup location matches pod location
          const withinLocation =
            !pickupLocation ||
            pod.location?.name
              ?.toLowerCase()
              .includes(pickupLocation.toLowerCase());

          // Check if luggage total is within pod limits
          // TODO: ERROR BECAUSE WE NEED TO TRACK SPACE LEFT
          // THIS IS INCORRECT RN!!!!
          const withinLuggage =
            Number(numCarryOn) + Number(numChecked) <=
            pod.num_small_luggage + pod.num_big_luggage;

          // Check gender matching if genderPreference is set
          const genderMatches = !genderPreference ||
            pod.members.every(member => member.gender === genderPreference);

          // Return if all checks are valid
          return sameDay && withinTime && withinLocation && withinLuggage && genderMatches;
        });

        // List of pods found
        setPods(filtered);
      } catch (err) {
        console.error("Error fetching pods:", err);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 1000 - elapsed);
        setTimeout(() => setLoading(false), remaining);
      }
    };

    fetchPods();
  }, [
    user,
    flight,
    earliestTime,
    latestTime,
    pickupLocation,
    numCarryOn,
    numChecked,
    isUserIdLoading,
    // refreshPodList,
  ]);

  // Transform flight data for FlightResultCard component
  const selectedFlight = flight?.code
    ? {
        id: "selected-flight",
        flightCode: flight.code,
        dateRange: flight.date || "",
        route: `${flight.from || ""} → ${flight.to || ""}`,
        airports: `${flight.from || ""} - ${flight.to || ""}`,
        boardingTime: flight.boarding || "",
        departureTime: flight.launch || "",
        arrivalTime: flight.landing || "",
      }
    : null;

  // const [mongoId, setMongoId] = useState("");

  // const findMongoIdFromFirebase = async (firebaseUid: string | undefined) => {
  //   if (!firebaseUid) {
  //     return;
  //   }
  //   const res = await fetch(
  //     `${import.meta.env.VITE_API_URL}/users/mongoid/${firebaseUid}`
  //   );
  //   if (!res.ok) throw new Error("Failed to fetch pods");
  //   const mongoId = await res.json();
  //   setMongoId(mongoId);
  //   // return mongoId;
  // };

  // Transform pods data for GroupOptionCard components

  const options = pods.map((pod, idx) => {
    // findMongoIdFromFirebase(user?.id);
    // const userId = !mongoId ? user?.id : mongoId;

    const userId = mongoId;
    // const userId = user?.id;
    const userAlreadyInPod =
      joinedPods.has(pod._id) ||
      pod.members.some((m) => {
        console.log("m: ", m._id);
        console.log("mongo: ", userId)
        return m.user === userId;
      });

    console.log(userAlreadyInPod);

    return {
      podId: pod._id,
      id: idx + 1,
      isRecommended: idx === 0,
      userAlreadyInPod,
      members: pod.members.map((m) => ({
        name: m.name?.split(" ")[0] || "User",
        initial: m.name?.[0] || "?",
        isEmpty: false,
      })),
      location: pod.location?.name || "Unknown location",
      luggageCount: pod.num_big_luggage + pod.num_small_luggage,
      time: new Date(pod.pickup_time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  return (
    <div className="flex flex-col justify-between h-full bg-[#16161b] text-white px-[12px] pt-[20px]">
      {loading || isUserIdLoading ? (
        <div className="flex flex-col items-center justify-center h-full text-white px-6">
          <p className="text-lg font-medium mb-[1rem]">
            Searching for rides...
          </p>
          <div className="spinner" />
        </div>
      ) : (
        <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* {toastMessage && <Toast message={toastMessage} />} */}
          <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] w-full">
            {/* Back Button */}
            <div className="content-stretch flex items-start relative shrink-0 w-full">
              <Button
                onClick={() =>
                  onNavigate("flightPreferences", undefined, undefined, {
                    flight,
                    flights,
                  })
                }
                variant="outline"
                className="gap-[8px] w-auto border-2 px-[12px] py-[8px]"
              >
                <span className="material-symbols-outlined text-[20px]">
                  arrow_back
                </span>
                Back
              </Button>
            </div>

            {/* Flight Info Header */}
            {selectedFlight && (
              <div className="content-stretch flex items-start relative shrink-0 w-full pointer-events-none">
                <FlightResultCard
                  flight={selectedFlight}
                  isExpanded={false}
                  onExpand={() => {}}
                  onSelect={() => {}}
                />
              </div>
            )}

            {/* Create Pod Button */}
            <div className="content-stretch flex items-start relative shrink-0 w-full">
              <Button
                onClick={() => onNavigate("createPod")}
                variant="default"
                className="w-full px-[16px] py-[12px]"
              >
                Create Pod
              </Button>
            </div>

            {/* Groups Section */}
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <p className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-none relative text-[18px] text-white tracking-[0.07px] w-full">
                Groups
              </p>

              {/* Option Cards */}
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                {options.length === 0 ? (
                  <p className="text-center text-gray-400 mt-6 w-full">
                    No pods available matching your preferences.
                  </p>
                ) : (
                  options.map((pod, idx) => (
                    <GroupOptionCard
                      key={pod.id}
                      optionNumber={pod.id}
                      // TODO: determine is recommended by algorithm
                      isRecommended={idx == 0}
                      members={pod.members}
                      location={pod.location}
                      luggageCount={pod.luggageCount}
                      time={pod.time}
                      userAlreadyInPod={pod.userAlreadyInPod}
                      onAccept={() => handleAccept(pod.podId)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
