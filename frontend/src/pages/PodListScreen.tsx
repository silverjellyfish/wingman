// Contributors: Michelle
// Time: 2 hours

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
      earliestTime = "",
      latestTime = "",
      numCarryOn = 0,
      numChecked = 0,
      pickupLocation = "",
   } = payload;

   const [pods, setPods] = useState<Pod[]>([]);
   const { user } = useAuth();
   const charToSplit = [":", " "];
   const regex = new RegExp(`[${charToSplit.join("")}]`, "g");

   useEffect(() => {
      if (!user || !flight?.date) return;

      const fetchPods = async () => {
         try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/pods/all`);
            if (!res.ok) throw new Error("Failed to fetch pods");

            const data: Pod[] = await res.json();

            const filtered = data.filter((pod) => {
               console.log("Evaluating pod:", pod);
               // Check if pod and flight date match
               const podDate = new Date(pod.pickup_time)
                  .toLocaleString()
                  .split(",")[0];
               const flightDate = new Date(flight.date)
                  .toISOString()
                  .split("T")[0];
               const flightArray = flightDate.split("-");
               const podArray = podDate.split("/");
               console.log("Pod date:", podDate, "Flight date:", flightDate);
               console.log(
                  "Earlitest time:",
                  earliestTime,
                  "Latest time:",
                  latestTime
               );
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
               // const [earliestHour, earliestMin] = (earliestTime || "00:00")
               //   .split(":")
               //   .map(Number);

               // const
               // console.log("Earliest hour and min:", earliestHour, earliestMin);
               // const [latestHour, latestMin] = (latestTime || "23:59")
               //   .split(":")
               //   .map(Number);

               const earliest = new Date(podTime);
               earliest.setHours(earliestHour, earliestMin, 0, 0);

               const latest = new Date(podTime);
               latest.setHours(latestHour, latestMin, 0, 0);

               console.log("Pod time:", podTime);
               console.log("Earliest time:", earliest);
               console.log("Latest time:", latest);
               console.log(
                  "Is within time:",
                  podTime >= earliest,
                  podTime <= latest
               );
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
               console.log("Luggage check:", withinLuggage);
               console.log("Day check:", sameDay);
               console.log("Time check:", withinTime);
               console.log("Location check:", withinLocation);
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
      alert(`Accepted! Option ${optionId} selected.`);
   };

   return (
      <div className="flex flex-col justify-between h-full bg-[#16161b] text-white px-[12px] pt-[20px]">
         {/* Main Content - Scrollable */}
         <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] w-full">
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
   );
}
