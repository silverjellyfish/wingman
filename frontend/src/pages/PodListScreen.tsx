// Contributors: Michelle
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button.tsx";
import { BottomNavigation } from "../components/layout/BottomNavigation.tsx";
import type { Flight, Screen } from "@/types";
import type { Pod } from "@/mock/mockRides";
import { mockPods } from "@/mock/mockRides";

interface PodListScreenProps {
  onNavigate: (screen: Screen) => void;
  flight: Flight;
}

export function PodListScreen({ onNavigate, flight }: PodListScreenProps) {
  const [pods, setPods] = useState<Pod[]>([]);

  // Simulate network call to fetch available pods
  useEffect(() => {
    const timer = setTimeout(() => {
      setPods(mockPods); // Here you could filter pods based on flight preferences
    }, 1500); // simulate delay for loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex flex-col gap-6 pb-40 pt-6 w-full">
          {/* Back button */}
          <Button onClick={() => onNavigate("flightPreferences")}>Back</Button>

          {/* Flight info */}
          <div className="bg-zinc-900 p-4 rounded-xl flex flex-col gap-2 border border-zinc-700">
            <p className="font-bold text-lg">{flight.code}</p>
            <p>{flight.from} → {flight.to}</p>
            <p>Boarding: {flight.boarding}</p>
            <p>Departure: {flight.launch}</p>
            <p>Landing: {flight.landing}</p>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mt-4">Groupa</h2>

          {/* Pods */}
          {pods.length === 0 ? (
            <p className="text-gray-400 text-center mt-6">Loading available rides...</p>
          ) : (
            pods.map((pod, idx) => (
              <div
                key={pod.id}
                className={`bg-zinc-900 rounded-xl shadow-md p-4 w-full flex flex-col gap-2 border border-zinc-700 ${
                  idx === 0 ? "border-accent" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Option {idx + 1}</p>
                  {idx === 0 && <p className="text-sm text-accent">Recommended</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Members:</p>
                  <div className="flex gap-2">
                    {pod.members.map((m) => (
                      <div key={m.id} className="flex flex-col items-center text-xs">
                        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                          {m.name[0]}
                        </div>
                        <p>{m.name.split(" ")[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p>Pickup: {pod.location.coordinates[1].toFixed(3)}, {pod.location.coordinates[0].toFixed(3)}</p>
                <p>Time: {new Date(pod.pickup_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>Total luggage: {pod.num_big_luggage + pod.num_small_luggage}</p>
                <Button className="mt-2 w-full" onClick={() => alert("Accepted!")}>
                  Accept
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen="ride" onNavigate={(s) => onNavigate(s)} />
    </div>
  );
}
