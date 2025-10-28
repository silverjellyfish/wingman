// Contributors: Michelle
// Time: 2 hours

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { FlightResultCard } from "@/components/FlightResultCard";
import { GroupOptionCard } from "@/components/GroupOptionCard";

// TODO: Consolidate these interfaces. Will be deleted later.
interface PodListScreenProps {
  onNavigate: (...args: any[]) => void;
  payload?: any;
}

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface Pod {
  id: string;
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

export function PodListScreen({
  onNavigate,
  payload = {},
}: PodListScreenProps) {
  const {
    flight = {},
    earliestTime = "",
    latestTime = "",
    numCarryOn = 0,
    numChecked = 0,
    pickupLocation = "",
  } = payload;

  const [pods, setPods] = useState<Pod[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !flight?.date) return;

    const fetchPods = async () => {
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
          const [earliestHour, earliestMin] = (earliestTime || "00:00")
            .split(":")
            .map(Number);
          const [latestHour, latestMin] = (latestTime || "23:59")
            .split(":")
            .map(Number);

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
          const withinLuggage =
            pod.num_small_luggage + pod.num_big_luggage <=
            Number(numCarryOn) + Number(numChecked);

          // Return if all checks are valid
          return sameDay && withinTime && withinLocation && withinLuggage;
        });

        // List of pods found
        setPods(filtered);
      } catch (err) {
        console.error("Error fetching pods:", err);
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
  ]);

  // Transform flight data for FlightResultCard component
  const selectedFlight = flight?.code ? {
    id: "selected-flight",
    flightCode: flight.code,
    dateRange: flight.date || "",
    route: `${flight.from || ""} → ${flight.to || ""}`,
    airports: `${flight.from || ""} - ${flight.to || ""}`,
    boardingTime: flight.boarding || "",
    departureTime: flight.launch || "",
    arrivalTime: flight.landing || "",
  } : null;

  // Transform pods data for GroupOptionCard components
  const options = pods.map((pod, idx) => ({
    id: idx + 1,
    isRecommended: idx === 0,
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
  }));

  const handleAccept = (optionId: number) => {
    alert("Accepted!");
  };

  return (
    <div className="bg-[#16161b] relative rounded-[40px] size-full">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-between overflow-clip p-[12px] relative size-full">
          {/* Main Content */}
          <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
            <div className="flex flex-col items-center size-full">
              <div className="box-border content-stretch flex flex-col gap-[40px] items-center px-[12px] py-[40px] relative size-full">
                {/* Back Button */}
                <div className="content-stretch flex items-start relative shrink-0 w-full">
                  <Button
                    onClick={() => onNavigate("flightPreferences")}
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
                      options.map((option) => (
                        <GroupOptionCard
                          key={option.id}
                          optionNumber={option.id}
                          isRecommended={option.isRecommended}
                          members={option.members}
                          location={option.location}
                          luggageCount={option.luggageCount}
                          time={option.time}
                          onAccept={() => handleAccept(option.id)}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <BottomNavigation currentScreen="ride" onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
