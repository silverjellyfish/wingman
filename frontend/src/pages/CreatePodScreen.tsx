// Contributors: Michelle
// Time: 2 hours

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";
import type { Screen, Flight } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { toast, Toaster } from "sonner";
import { LOCATIONS } from "@/constants/locations";

interface ExtendedFlight extends Flight {
  dropoffAirportId?: string;
}

// Props for creating a pod
interface CreatePodScreenProps {
  onNavigate: (screen: Screen, payload?: any) => void;
  flight: ExtendedFlight;
}

export function CreatePodScreen({ onNavigate, flight }: CreatePodScreenProps) {
  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [pickupTime, setPickupTime] = useState("");
  const [numBig, setNumBig] = useState("0");
  const [numSmall, setNumSmall] = useState("0");
  const { user } = useAuth();

  const [userProfile, setUserProfile] = useState<any>(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Hardcoded Vanderbilt locations
  const locations = LOCATIONS;

  // Filter locations based on search query
  const filteredLocations = locations.filter((location) =>
    location
      .toLowerCase()
      .includes((searchQuery || pickupLocation).toLowerCase())
  );

  // Fetch user profile (to get Mongo ID needed for pod creation)
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/profile/${user.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUserProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [user]);

  const handleCreatePod = async () => {
    // Determine the required flight details from the flight prop
    const flightCode = flight.code;
    const flightDate = flight.date;
    const origin = flight.from;
    const destination = flight.to;

    const dropoffLocationId = (flight as any).dropoffAirportId;
    if (
      !userProfile ||
      !pickupLocation ||
      !pickupDate ||
      !pickupTime ||
      !flightCode ||
      !flightDate ||
      !destination ||
      !dropoffLocationId
    ) {
      toast.error("Please ensure all trip and flight details are complete.");
      return;
    }

    // Validate the location is in the list
    if (!locations.includes(pickupLocation)) {
      toast.error("Please select a valid pickup location from the list");
      return;
    }

    // Combine date and time into ISO string
    const [hours, minutes] = pickupTime.split(":");
    const combinedDateTime = new Date(pickupDate);
    combinedDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    try {
      let pickupLocationId = "";

      // 1. Determine Pickup Location ID (from Location model - this logic is fine)
      const locationsRes = await fetch(
        `${import.meta.env.VITE_API_URL}/locations`
      );

      if (locationsRes.ok) {
        const existingLocations = await locationsRes.json();
        const existing = existingLocations.find(
          (loc: any) => loc.name === pickupLocation
        );

        if (existing) {
          pickupLocationId = existing._id;
        } else {
          // Create new pickup location (simplified creation for now)
          const createRes = await fetch(
            `${import.meta.env.VITE_API_URL}/locations`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: pickupLocation,
                address: pickupLocation,
                type: "university",
              }),
            }
          );

          if (createRes.ok) {
            const newLoc = await createRes.json();
            pickupLocationId = newLoc._id;
          }
        }
      }

      if (!pickupLocationId) {
        toast.error("Failed to determine pickup location ID");
        return;
      }

      // 3. Create the Pod with all required data
      const res = await fetch(`${import.meta.env.VITE_API_URL}/pods`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup_time: combinedDateTime.toISOString(),
          pickupLocationId: pickupLocationId,
          dropoffLocationId: dropoffLocationId,
          userId: userProfile._id,
          num_big_luggage: parseInt(numBig),
          num_small_luggage: parseInt(numSmall),
          flightCode: flightCode,
          flightDate: flightDate,
          origin: origin,
          destination: destination,
        }),
      });

      if (res.ok) {
        const pod = await res.json();
        toast.success("Pod created successfully!");
        onNavigate("trip", { flight, pod });
      } else {
        const error = await res.json();
        toast.error(`Failed to create pod: ${error.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create pod due to network or server error");
    }
  };

  return (
    <div className="bg-[#16161b] relative size-full px-[12px] pt-[20px]">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-c  ol items-start justify-between overflow-clip relative size-full">
          {/* Main Content */}
          <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
            <div className="flex flex-col items-center size-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="box-border content-stretch flex flex-col gap-[40px] items-center relative size-full">
                {/* Back Button */}
                <div className="content-stretch flex items-start relative shrink-0 w-full">
                  <Button
                    onClick={() => onNavigate("rideWithGroup", flight)}
                    variant="outline"
                    className="gap-[8px] w-auto border-2 px-[12px] py-[8px]"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      arrow_back
                    </span>
                    Back
                  </Button>
                </div>

                {/* Title */}
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  <p className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-none relative text-[24px] text-white tracking-[0.09px] w-full">
                    Create New Pod
                  </p>
                </div>

                {/* Form Fields */}
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  {/* Pickup Date & Time Section */}
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <p
                      className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                      style={{ fontWeight: 600 }}
                    >
                      Pickup Date & Time
                    </p>

                    <div className="flex gap-[16px] w-full">
                      {/* Date Input */}
                      <Input
                        type="text"
                        placeholder="YYYY-MM-DD"
                        value={
                          pickupDate ? format(pickupDate, "yyyy-MM-dd") : ""
                        }
                        onClick={() => setIsDatePickerOpen(true)}
                        readOnly
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 cursor-pointer"
                      />

                      <Dialog
                        open={isDatePickerOpen}
                        onOpenChange={setIsDatePickerOpen}
                      >
                        <DialogContent className="w-2/3 max-w-[260px] border-2 border-accent rounded-[16px]">
                          <div className="flex justify-center pt-[40px] rounded-[12px]">
                            <Calendar
                              className="rounded-[12px]"
                              selected={pickupDate}
                              onSelect={(date) => {
                                setPickupDate(date);
                                setIsDatePickerOpen(false);
                              }}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Time Input */}
                      <Input
                        type="time"
                        placeholder="HH:MM"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[2px] w-full bg-zinc-800 rounded-full" />

                  {/* Location Section */}
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <p
                      className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                      style={{ fontWeight: 600 }}
                    >
                      Pickup Location
                    </p>

                    <div className="relative w-full">
                      <Input
                        type="text"
                        value={searchQuery || pickupLocation}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => {
                          // Delay to allow click on dropdown item
                          setTimeout(() => setShowDropdown(false), 200);
                        }}
                        placeholder="Search location"
                      />
                      {showDropdown && filteredLocations.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-primary-foreground border-accent border-[2px] rounded-[10px] shadow-lg max-h-[200px] overflow-y-auto z-50">
                          {filteredLocations.map((location, idx) => (
                            <button
                              key={idx}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                setPickupLocation(location);
                                setSearchQuery("");
                                setShowDropdown(false);
                              }}
                              className="w-full text-left px-[14px] py-[12px] hover:bg-accent text-primary transition-colors"
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[2px] w-full bg-zinc-800 rounded-full" />

                  {/* Luggage Section */}
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <p
                      className="leading-none relative text-[18px] text-white tracking-[0.07px] w-full"
                      style={{ fontWeight: 600 }}
                    >
                      Luggage
                    </p>

                    <div className="content-stretch flex gap-[26px] items-center relative shrink-0 w-full">
                      {/* Checked Bags */}
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
                        <p
                          className="leading-none relative text-[14px] text-white tracking-[0.07px] w-full"
                          style={{ fontWeight: 600 }}
                        >
                          Checked Bags
                        </p>
                        <div className="flex items-center gap-[8px] w-full">
                          <Input
                            type="text"
                            inputMode="numeric"
                            value={numBig}
                            onChange={(e) =>
                              setNumBig(e.target.value.replace(/[^0-9]/g, ""))
                            }
                            className="w-[60px]"
                            style={{ maxWidth: "60px" }}
                            placeholder="0"
                          />
                          <span className="text-[14px] text-zinc-400">
                            bags
                          </span>
                        </div>
                      </div>

                      {/* Carry-On Bags */}
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
                        <p
                          className="leading-none relative text-[14px] text-white tracking-[0.07px] w-full"
                          style={{ fontWeight: 600 }}
                        >
                          Carry-On Bags
                        </p>
                        <div className="flex items-center gap-[8px] w-full">
                          <Input
                            type="text"
                            inputMode="numeric"
                            value={numSmall}
                            onChange={(e) =>
                              setNumSmall(e.target.value.replace(/[^0-9]/g, ""))
                            }
                            className="w-[60px]"
                            style={{ maxWidth: "60px" }}
                            placeholder="0"
                          />
                          <span className="text-[14px] text-zinc-400">
                            bags
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Create Pod Button */}
                <Button className="w-full" onClick={handleCreatePod}>
                  Create Pod
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
