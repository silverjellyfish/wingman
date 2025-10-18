// Contributors: Michelle

import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { BottomNavigation } from "../components/layout/BottomNavigation";
import type { Flight, Screen } from "@/types";
import type { Pod } from "@/mock/mockRides";
import { useAuth } from "../contexts/AuthContext";

interface PodListScreenProps {
  onNavigate: (screen: Screen) => void;
  flight: Flight;
}

export function PodListScreen({ onNavigate, flight }: PodListScreenProps) {
  const [pods, setPods] = useState<Pod[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchPods = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/pods/all`);
        if (!res.ok) throw new Error("Failed to fetch pods");

        const data: Pod[] = await res.json();

        // Filter pods to only include those matching the flight date
        const filtered = data.filter((pod) => {
          const podDate = new Date(pod.pickup_time).toISOString().split("T")[0];
          const flightDate = new Date(flight.date).toISOString().split("T")[0];
          return podDate === flightDate;
        });

        setPods(filtered);
      } catch (err) {
        console.error("Error fetching pods:", err);
      }
    };

    fetchPods();
  }, [user, flight.date]);

  return (
    <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Button
          variant="back"
          className="mt-[1rem] pl-[2vw] pr-[2vw]"
          onClick={() => onNavigate("flightPreferences")}
        >
          Back
        </Button>

        <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] pt-[80px] px-[40px] w-full">
          <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
            <p className="leading-none" style={{ fontWeight: 600 }}>
              Available Pods
            </p>
          </div>
          <Button
            className="mt-[0.1rem] pl-[2vw] pr-[2vw]"
            onClick={() => onNavigate("createPod")}
          >
            Create Pod
          </Button>
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

          {/* Pods */}
          {/* TODO: CHANGE LATER THIS IS UGLY */}
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
            {pods.length === 0 ? (
              <p className="text-center text-gray-400 mt-6">
                Loading available rides...
              </p>
            ) : (
              pods.map((pod, idx) => (
                <div
                  key={pod.id}
                  className="flex flex-col space-between p-[12px] bg-[#28282d] rounded-[20px] mt-[1rem]"
                >
                  <div className="flex flex-row justify-between items-center">
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
                      {pod.members.map((m) => (
                        <div
                          key={m.id}
                          className="flex flex-col items-center text-xs text-white/80"
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
                            {m.name?.[0] || "?"}
                          </div>
                          <p>{m.name?.split(" ")[0]}</p>
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

      {/* Bottom Navigation */}
      <BottomNavigation
        currentScreen="ride"
        onNavigate={(s) => onNavigate(s)}
      />
    </div>
  );
}
