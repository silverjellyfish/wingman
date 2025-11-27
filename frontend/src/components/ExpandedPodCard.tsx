import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { BsSuitcase2, BsSuitcaseLg } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface GroupMember {
  firebaseUid: string;
  id: number;
  name: string;
  phoneNumber: string;
}

interface ExpandedPodCardProps {
  flight: {
    id: string;
    flightCode: string;
    dateRange: string;
    route: string;
    airports: string;
    boardingTime: string;
    departureTime: string;
    arrivalTime: string;
    destination: string;
    pickupTimeDisplay: string;
  };
  pod: {
    id: string;
    numPeople: number;
    listPeopleIds: GroupMember[];
    pickupTime: string;
    pickupTimeDisplay: string;
    location: string;
    // pickupLocation: string;
    // dropoffLocation: string;
    numBigLuggage: number;
    numSmallLuggage: number;
  };
  onLeave: () => void;
}

export function ExpandedPodCard({
  flight,
  pod,
  onLeave,
}: ExpandedPodCardProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const { user } = useAuth();

  const handleLeaveGroup = async (podId: string) => {
    if (!user) {
      return;
    }

    if (!isConfirming) {
      setIsConfirming(true);
    } else {
      // TODO: Add actual leave group logic here
      // Reset confirmation state after leaving
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/pods/${podId}/leave`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
            }),
          }
        );
        if (res.ok) {
          onLeave();
        } else {
          alert("Failed to leave group:");
        }
      } catch (error) {
        console.error("Error leaving group:", error);
      }
      setIsConfirming(false);
    }
  };

  return (
    <div
      key={pod.id}
      className="flex flex-col space-between w-full bg-[#28282d] rounded-[16px] p-[12px] gap-[12px]"
    >
      {/* pickup location to dropoff location */}
      <div className="flex flex-col items-center w-full gap-[3px]">
        {/* Pickup location */}
        <div className="flex flex-row items-center gap-[4px]">
          <span className="font-[600] text-[16px]">Pickup Location:</span>
          <span className="font-[400] text-[16px]">{pod.location}</span>
        </div>

        {/* Pickup time */}
        <span className="text-[14px] font-[500] text-[#A1A1AA] text-center">
          {flight.dateRange} at {pod.pickupTimeDisplay}
        </span>
      </div>
      {/* list of people in pod */}
      <div className="flex flex-col gap-[6px] ">
        {pod.listPeopleIds.map((member) => (
          // each row represents a new member in the pod
          //  TODO: THIS KEY MIGHT BE UNDEFINED, CAUSING AN ERROR
          <div
            key={member.id}
            className="px-[4px] flex flex-row justify-between items-center gap-[4px]"
          >
            {/* name and picture */}
            <div className="flex flex-row items-center">
              {/* profile picture */}
              <Avatar className="w-[25px] h-[25px] mr-[8px]">
                <AvatarFallback className="bg-[#FAFAFA] text-[#28282d] text-[10px] font-semibold">
                  {member.name}
                </AvatarFallback>
              </Avatar>

              <p className="text-[16px] !font-semibold">{member.name}</p>
            </div>
            <p className="text-[16px] !font-semibold">{member.phoneNumber}</p>
            {/* suitcase icons with luggage count */}
          </div>
        ))}
      </div>
      {/* total luggage count and group chat button */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-[4px] ml-[6px]">
          <p className="text-[16px] !font-semibold"> Total Luggage: </p>
          <div className="flex flex-row gap-[2px]">
            <BsSuitcase2 style={{ height: 25 }} className="mr-[2px]" />
            <p className="pr-[8px] text-[16px] font-semibold">
              {pod.numBigLuggage}
            </p>
            <BsSuitcaseLg style={{ height: 25 }} className="mr-[4px]" />
            <p className="pr-[8px] text-[16px] font-semibold">
              {pod.numSmallLuggage}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-[4px] !p-[2px] !px-[8px] text-[16px]"
          onClick={() => {
            const phoneNumbers = pod.listPeopleIds
              .map((member) => member.phoneNumber)
              .filter(Boolean);
            if (phoneNumbers.length > 0) {
              window.location.href = `sms:${phoneNumbers.join(",")}`;
            }
          }}
        >
          <IoChatbubblesOutline size={18} />
          Contact All
        </Button>
      </div>
      {/* leave group button */}
      <div className="flex justify-center mt-[3px] mb-[3px]">
        <Button
          variant="destructive"
          size="icon"
          className="p-[2px] w-[100%]"
          onClick={() => {
            handleLeaveGroup(pod.id);
          }}
        >
          {isConfirming ? "Are you sure you want to leave?" : "Leave Group"}
        </Button>
      </div>
    </div>
  );
}
