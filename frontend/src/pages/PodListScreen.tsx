// Contributors: Michelle
// Time: 3 hours

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { FlightResultCard } from "@/components/FlightResultCard";
import { GroupOptionCard } from "@/components/GroupOptionCard";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Pod, User } from "@/types/pod_types.ts";
import { createPodFilter } from "@/../utils/podFilters.ts";

interface PodListScreenProps {
  onNavigate: (...args: any[]) => void;
  payload?: any;
}

/* Converts time string like "2:30 PM" to "14:30" */
function convertToMilitaryTime(timeStr: string): string {
  const d = new Date(`2025/10/28 ${timeStr}`);
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
  const [joinedPods, setJoinedPods] = useState<Set<string>>(new Set());

  const { user } = useAuth();
  const [mongoId, setMongoId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [isUserIdLoading, setIsUserIdLoading] = useState(true);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [podToJoin, setPodToJoin] = useState<Pod | null>(null);
  const [existingPod, setExistingPod] = useState<Pod | null>(null);

  // Regex to split time strings
  const charToSplit = [":", " "];
  const regex = new RegExp(`[${charToSplit.join("")}]`, "g");

  /* Handles leaving an existing pod */
  const handleLeavePod = async (podId: string) => {
    if (!user) {
      return false;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/pods/${podId}/leave`,
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
      return true;
    } catch (err) {
      console.error("Error leaving pod:", err);
      toast.error("Failed to leave the existing pod.");
      return false;
    }
  };

  /* Handles joining a new pod */
  const joinPod = async (podId: string) => {
    if (!user) {
      return;
    }
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

      toast.success("Successfully joined the new pod!");
      onNavigate("trip");
    } catch (err) {
      console.error("Error joining pod:", err);
      toast.error("Failed to join pod");
      setJoinedPods((prev) => {
        const next = new Set(prev);
        next.delete(podId);
        return next;
      });
    }
  };

  /* Handles replacing existing pod with new pod */
  const handleReplacePod = async () => {
    if (!podToJoin || !existingPod) return;

    setShowConfirmDialog(false);
    const successfullyLeft = await handleLeavePod(existingPod._id);

    if (successfullyLeft) {
      await joinPod(podToJoin._id);
    }
  };

  /* Handles accepting to join a pod */
  const handleAccept = async (podId: string) => {
    if (!mongoId || !user) return;

    const targetPod = pods.find((p) => p._id === podId);
    if (!targetPod) return;

    // Check if the user is already in any *other* pod for the same flight
    const userCurrentPod = pods.find((p) =>
      p.members.some((m) => m.user === mongoId)
    );

    if (userCurrentPod && userCurrentPod._id !== podId) {
      // User is already in a different pod, trigger the replacement confirmation flow
      setExistingPod(userCurrentPod);
      setPodToJoin(targetPod);
      setShowConfirmDialog(true);
    } else {
      await joinPod(podId);
    }
  };

  /* Fetch MongoDB ID for the current user */
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

    if (mongoId === null && isUserIdLoading) {
      findMongoIdFromFirebase(user.id);
    }
  }, [user, mongoId, isUserIdLoading]);

  /* Fetch pods and filter based on user criteria */
  useEffect(() => {
    if (!user || !flight?.date || isUserIdLoading) return;

    const fetchPods = async () => {
      setLoading(true);
      const startTime = Date.now();
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/pods/all`);
        if (!res.ok) throw new Error("Failed to fetch pods");

        const data: Pod[] = await res.json();

        const filter = createPodFilter({
          flightDate: flight.date,
          earliestTime,
          latestTime,
          pickupLocation,
          numCarryOn,
          numChecked,
          genderPreference,
        });

        const filtered = data.filter(filter);

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
  ]);

  // --- Data Transformation (unchanged) ---
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

  const options = pods.map((pod, idx) => {
    const userId = mongoId;
    const userAlreadyInPod =
      joinedPods.has(pod._id) ||
      pod.members.some((m) => {
        return m.user === userId;
      });

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
      {/* --- CONFIRMATION DIALOG --- */}
      {podToJoin && existingPod && (
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="bg-[#1f1f23] text-white rounded-[16px] border-accent border-[2px] w-[90%] max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="mt-[1rem]">
                Replace Existing Pod? 🤔
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                You are already a member of a pod for this trip, with pickup at
                **{existingPod.location.name}**.
                <br />
                Are you sure you want to **leave that pod** and join the new one
                for **
                {new Date(podToJoin.pickup_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                **?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 justify-end mb-[1rem] mt-[1rem]">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="w-full bg-accent hover:bg-accent/80 text-primary-foreground" // Using a distinct color for the confirm action
                onClick={handleReplacePod}
              >
                Replace Pod
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {/* --------------------------- */}

      {loading || isUserIdLoading ? (
        <div className="flex flex-col items-center justify-center h-full text-white px-6">
          <p className="text-lg font-medium mb-[1rem]">
            Searching for rides...
          </p>
          <div className="spinner" />
        </div>
      ) : (
        <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                onClick={() => onNavigate("createPod", { flight })} // Pass flight to createPod
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
