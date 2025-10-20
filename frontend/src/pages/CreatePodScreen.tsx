// Contributors: Michelle
// Time: 2 hours

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Screen, Flight } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface CreatePodScreenProps {
  onNavigate: (screen: Screen, payload?: any) => void;
  flight: Flight;
}

export function CreatePodScreen({ onNavigate, flight }: CreatePodScreenProps) {
  const [pickupTime, setPickupTime] = useState("");
  const [location, setLocation] = useState("");
  const [numBig, setNumBig] = useState("0");
  const [numSmall, setNumSmall] = useState("0");
  const { user } = useAuth();

  const [userProfile, setUserProfile] = useState<any>(null);
  const [locations, setLocations] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [newLocationName, setNewLocationName] = useState("");
  const [newLocationAddress, setNewLocationAddress] = useState("");
  const [newLocationType, setNewLocationType] = useState("airport");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch available locations for the dropdown
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/locations`);
        const data = await res.json();
        setLocations(data);
        if (data.length > 0) setSelectedLocationId(data[0]._id);
      } catch (err) {
        console.error("Failed to fetch locations:", err);
      }
    };
    fetchLocations();
  }, []);

  // Fetch user profile
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
    if (!userProfile || !selectedLocationId) {
      alert("User or location not loaded");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/pods`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup_time: pickupTime,
          locationId: selectedLocationId,
          userId: userProfile._id,
          num_big_luggage: parseInt(numBig),
          num_small_luggage: parseInt(numSmall),
        }),
      });

      if (res.ok) {
        const pod = await res.json();
        alert("Pod created successfully!");
        onNavigate("rideWithGroup", flight);
      } else {
        const error = await res.json();
        alert(`Failed to create pod: ${error.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create pod due to network or server error");
    }
  };

  return (
    <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Button
          variant="back"
          className="mt-[1rem] pl-[2vw] pr-[2vw]"
          onClick={() => onNavigate("rideWithGroup", flight)}
        >
          Back
        </Button>
        <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] pt-[80px] px-[40px] w-full">
          <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
            <p className="leading-none" style={{ fontWeight: 600 }}>
              Create New Pod
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
            <p style={{ fontWeight: 600 }}>Pickup Time</p>
            <Input
              type="datetime-local"
              placeholder="Pickup Date & Time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="bg-zinc-800 text-white"
            />
          </div>

          <Select
            value={selectedLocationId}
            onValueChange={(value) => setSelectedLocationId(value)}
          >
            <SelectTrigger className="w-full bg-zinc-800 text-white">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>

            <SelectContent>
              {locations.length === 0 ? (
                <SelectItem value="no-locations" disabled>
                  No locations available
                </SelectItem>
              ) : (
                locations.map((loc) => (
                  <SelectItem key={loc._id} value={loc._id}>
                    {loc.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <form>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full mt-2">
                  + Add New Location
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Location</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                  <Input
                    placeholder="Location Name"
                    value={newLocationName}
                    onChange={(e) => setNewLocationName(e.target.value)}
                    className="bg-zinc-800 text-white"
                  />

                  <Input
                    placeholder="Address"
                    value={newLocationAddress}
                    onChange={(e) => setNewLocationAddress(e.target.value)}
                    className="bg-zinc-800 text-white"
                  />

                  <Select
                    value={newLocationType}
                    onValueChange={(value) => setNewLocationType(value)}
                  >
                    <SelectTrigger className="w-full bg-zinc-800 text-white">
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      {["airport", "university", "hotel", "landmark"].map(
                        (type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <DialogFooter className="mt-6">
                  <Button
                    className="w-full"
                    onClick={async () => {
                      if (
                        !newLocationName ||
                        !newLocationAddress ||
                        !newLocationType
                      ) {
                        alert("Please fill out all fields.");
                        return;
                      }

                      try {
                        const res = await fetch(
                          `${import.meta.env.VITE_API_URL}/locations`,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              name: newLocationName,
                              address: newLocationAddress,
                              type: newLocationType,
                            }),
                          }
                        );

                        if (!res.ok) {
                          const error = await res.json();
                          alert(
                            `Failed to add location: ${
                              error.error || "Unknown error"
                            }`
                          );
                          return;
                        }

                        const newLoc = await res.json();
                        setLocations((prev) => [...prev, newLoc]);
                        setSelectedLocationId(newLoc._id);
                        setNewLocationName("");
                        setNewLocationAddress("");
                        setNewLocationType("airport");
                        setIsDialogOpen(false);
                      } catch (err) {
                        console.error(err);
                        alert("Network or server error while adding location.");
                      }
                    }}
                  >
                    Add Location
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>

          <div className="flex flex-row gap-[1rem] w-full items-center">
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p style={{ fontWeight: 600 }}># Carry-on(s)</p>
              <Input
                type="text"
                value={numSmall}
                className="bg-zinc-800 text-white"
                onChange={(e) =>
                  setNumSmall(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
              <p style={{ fontWeight: 600 }}># Checked-in(s)</p>
              <Input
                type="text"
                value={numBig}
                className="bg-zinc-800 text-white"
                onChange={(e) =>
                  setNumBig(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
            </div>
          </div>
          <Button className="pl-[2vw] pr-[2vw]" onClick={handleCreatePod}>
            Create Pod
          </Button>
        </div>
      </div>
    </div>
  );
}
