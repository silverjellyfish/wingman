import { BsSuitcase2, BsSuitcaseLg } from "react-icons/bs";

interface GroupMember {
  firebaseUid: string;
}

interface PriorTripCardProps {
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
    // pick_or_drop_time? what did we decide about this?
    location: string;
    numBigLuggage: number;
    numSmallLuggage: number;
  };
}

export function PriorTripCard({ flight, pod }: PriorTripCardProps) {
  return (
    <div
      key={pod.id}
      className="flex flex-col space-between p-[12px] bg-[#28282d] rounded-[20px] space-y-[10px]"
    >
      <div className="flex flex-row justify-between items-center">
        <p
          className="text-sm text-gray-400 mb-3 text-[18px]"
          style={{ fontWeight: 600 }}
        >
          {flight.dateRange} • {flight.boardingTime}
        </p>
        <div className="flex -space-x-[8px]">
          {pod.listPeopleIds.slice(0, 3).map((member) => (
            <div
              key={member.firebaseUid}
              className="w-[25px] h-[25px] rounded-full bg-[#FAFAFA] border-[1px] border-[#28282d]"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center gap-[2px] text-[15px]">
        <h3 className="font-medium mb-1">
          <span style={{ fontWeight: 600 }}>Location: </span>
          {flight.destination}
        </h3>
        <div className="flex flex-row items-end space-x-[2px] text-[18px]">
          <BsSuitcase2 style={{ height: 25 }} />
          <p className="pr-[8px]">{pod.numBigLuggage}</p>
          <BsSuitcaseLg style={{ height: 25 }} />
          <p className="pr-[8px]">{pod.numSmallLuggage}</p>
        </div>
      </div>
    </div>
  );
}
