import { FaArrowRight } from "react-icons/fa";
import { BsSuitcase2, BsSuitcaseLg } from "react-icons/bs";
import { Button } from "./ui/button";

interface GroupMember {
  firebaseUid: string;
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
  };
  pod: {
    id: string;
    numPeople: number;
    listPeopleIds: GroupMember[];
    pickupTime: string;
    pickupLocation: string;
    dropoffLocation: string;
    numBigLuggage: number;
    numSmallLuggage: number;
  };
}

export function ExpandedPodCard({ flight, pod }: ExpandedPodCardProps) {
  return (
    <div
      key={pod.id}
      className="flex flex-col space-between w-full bg-[#28282d] rounded-[16px] p-[5px] gap-[4px]"
    >
      {/* pickup location to dropoff location */}
      <div className="flex flex-row w-full justify-around items-center">
        <div className="flex flex-col items-center">
          <h3 className="font-[600] text-[16px]">{pod.pickupLocation}</h3>
          <span className="text-[13px] text-[#A1A1AA]">
            {flight.dateRange} - {pod.pickupTime}{" "}
          </span>
        </div>
        <FaArrowRight />
        <div className="flex flex-col items-center">
          <h3 className="font-[600] text-[16px]">{pod.dropoffLocation}</h3>
          <span className="text-[13px] text-[#A1A1AA]">
            {flight.dateRange} - {pod.pickupTime}{" "}
          </span>
        </div>
      </div>
      {/* list of people in pod */}
      <div>
        {pod.listPeopleIds.map((member) => (
          // each row represents a new member in the pod
          <div
            key={member.firebaseUid}
            className="flex flex-row justify-between items-center m-[2px]"
          >
            {/* name and picture */}
            <div className="flex flex-row items-center">
              {/* profile picture */}
              <div
                key={member.firebaseUid}
                className="w-[25px] h-[25px] rounded-full bg-[#FAFAFA] border-[1px] border-[#28282d] mr-[4px]"
              />

              <p className="text-[13px]">{member.name}</p>
            </div>
            <p className="text-[13px]">{member.phoneNumber}</p>
            {/* suitcase icons with luggage count */}
            <div className="flex flex-row gap-[2px]">
              {/* TODO: need to replace hardcoded values with the results from backend call to userspec */}
              <BsSuitcase2 style={{ height: 25 }} />
              <p className="pr-[8px]">0</p>
              <BsSuitcaseLg style={{ height: 25 }} className="mr-[2px]" />
              <p className="pr-[8px]">0</p>
            </div>
          </div>
        ))}
      </div>
      {/* total luggage count */}
      <div className="flex flex-row gap-[4px] ml-[6px]">
        <p> Total Luggage: </p>
        <div className="flex flex-row gap-[2px]">
          <BsSuitcase2 style={{ height: 25 }} />
          <p className="pr-[8px]">{pod.numBigLuggage}</p>
          <BsSuitcaseLg style={{ height: 25 }} className="mr-[2px]" />
          <p className="pr-[8px]">{pod.numSmallLuggage}</p>
        </div>
      </div>
      {/* leave group button */}
      <div className="flex justify-center mt-[3px] mb-[3px]">
        <Button
          variant="destructive"
          size="icon"
          className="p-[2px] w-[80%]"
          onClick={() => {
            console.log("Clicked");
          }}
        >
          Leave Group
        </Button>
      </div>
    </div>
  );
}
