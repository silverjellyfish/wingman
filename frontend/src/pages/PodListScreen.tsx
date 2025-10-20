// Contributors: Michelle
// Time: 2 hours

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";

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
          const podDate = new Date(pod.pickup_time).toISOString().split("T")[0];
          const flightDate = new Date(flight.date).toISOString().split("T")[0];

          const podTime = new Date(pod.pickup_time);

          // safe parsing of earliest/latest
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

          const withinLocation =
            !pickupLocation ||
            pod.location?.name
              ?.toLowerCase()
              .includes(pickupLocation.toLowerCase());

          const withinLuggage =
            pod.num_small_luggage + pod.num_big_luggage <=
            Number(numCarryOn) + Number(numChecked);

          return (
            podDate === flightDate &&
            withinTime &&
            withinLocation &&
            withinLuggage
          );
        });

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

  return (
    <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <Button
          variant="back"
          className="mt-[1rem] pl-[2vw] pr-[2vw]"
          onClick={() => onNavigate("flightPreferences")}
        >
          Back
        </Button>

        <div className="flex flex-col items-center gap-[40px] pb-[40px] pt-[80px] px-[40px] w-full">
          <h1 className="text-[32px] font-semibold text-center">
            Available Pods
          </h1>

          <Button
            className="mt-[0.1rem] px-[2vw]"
            onClick={() => onNavigate("createPod")}
          >
            Create Pod
          </Button>

          {/* ✅ Flight info (with safe checks) */}
          {flight?.code && (
            <div className="flex flex-col p-[12px] bg-[#566957] rounded-[20px] mt-[1rem] w-full max-w-md">
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">{flight.code}</p>
                <p className="text-gray-400 text-sm font-semibold">
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
                <p className="font-semibold">Launch: {flight.launch}</p>
                <p className="font-semibold">Landing: {flight.landing}</p>
                <p className="font-semibold">Boarding: {flight.boarding}</p>
              </div>
            </div>
          )}

          {/* Pods */}
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
            {pods.length === 0 ? (
              <p className="text-center text-gray-400 mt-6">
                No pods available matching your preferences.
              </p>
            ) : (
              pods.map((pod, idx) => (
                <div
                  key={pod.id ?? idx}
                  className="flex flex-col p-[12px] bg-[#28282d] rounded-[20px] mt-[1rem]"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Option {idx + 1}</p>
                    {idx === 0 && (
                      <p className="text-sm text-accent font-semibold">
                        Recommended
                      </p>
                    )}
                  </div>

                  {/* Members */}
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-gray-400 text-sm font-semibold">
                      Members:
                    </p>
                    <div className="flex gap-2">
                      {pod.members.map((m, midx) => (
                        <div
                          key={m.id ?? midx}
                          className="flex flex-col items-center text-xs text-white/80"
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
                            {m.name?.[0] || "?"}
                          </div>
                          <p>{m.name?.split(" ")[0] ?? "User"}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location and Time */}
                  <div className="grid grid-cols-2 text-sm text-gray-400 gap-2 mt-3">
                    <p className="font-semibold">
                      Pickup: {pod.location?.name || "Unknown location"}
                    </p>
                    <p className="font-semibold">
                      Time:{" "}
                      {new Date(pod.pickup_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Luggage */}
                  <p className="text-sm text-gray-400 font-semibold mt-1">
                    Total luggage: {pod.num_big_luggage + pod.num_small_luggage}
                  </p>

                  <Button
                    className="mt-[1rem] w-full"
                    onClick={() => alert("Accepted!")}
                  >
                    Accept
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <BottomNavigation currentScreen="ride" onNavigate={onNavigate} />
    </div>
  );
}
