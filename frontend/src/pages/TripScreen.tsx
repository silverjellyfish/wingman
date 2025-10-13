import { BottomNavigation } from "../components/layout/BottomNavigation";
import { BsSuitcase2, BsSuitcaseLg} from "react-icons/bs";

type Screen =
   | "ride"
   | "flightInput"
   | "flightDate"
   | "loading"
   | "groupMatching"
   | "flightResults"
   | "flightPreferences"
   | "groupDetail"
   | "rideWithGroup"
   | "trip"
   | "profile";

interface TripScreenProps {
   onNavigate: (screen: Screen) => void;
}

export function TripScreen({ onNavigate }: TripScreenProps) {
   const trips = [
      {
         id: 1,
         destination: "Nashville Airport",
         date: "Dec 20, 2024",
         time: "3:00 PM",
         members: [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Smith" },
            { id: 3, name: "Mike Johnson" },
         ],
         bigSuitcase: 2,
         smallSuitcase: 1,
      },
      {
         id: 2,
         destination: "Nashville Airport",
         date: "Nov 15, 2024",
         time: "2:00 PM",
         members: [
            { id: 1, name: "Sarah Lee" },
            { id: 2, name: "Tom Brown" },
         ],
         bigSuitcase: 3,
         smallSuitcase: 2,
      },
   ];

   return (
      <div className="flex flex-col justify-between min-h-screen bg-[#16161b] text-white p-6">
         <div>
            {/* Header */}
            <div className="p-[20px] pb-[50px] text-[24px] text-center text-white tracking-[0.12px] w-full ">
               <p style={{ fontWeight: 600 }}>
                  Trip History
               </p>
            </div>
            <div className="space-y-[10px]">
               {trips.map((trip) => (
                  <div key={trip.id} className="flex flex-col space-between p-[12px] bg-[#28282d] rounded-[20px] space-y-[10px]">
                     <div className="flex flex-row justify-between items-center">
                        <p className="text-sm text-gray-400 mb-3 text-[18px]" style={{ fontWeight: 600 }}>
                           {trip.date} • {trip.time}
                        </p>
                        <div className="flex -space-x-[8px]">
                           {trip.members.slice(0, 3).map((member) => (
                              <div
                                 key={member.id}
                                 className="w-[25px] h-[25px] rounded-full bg-[#FAFAFA] border-[1px] border-[#28282d]"
                              />
                           ))}
                        </div>
                     </div>
                     <div className="flex flex-row justify-between items-center gap-[2px] text-[15px]">
                        <h3 className="font-medium mb-1"><span style={{ fontWeight: 600 }}>Location: </span>{trip.destination}</h3>
                        <div className="flex flex-row items-end space-x-[2px] text-[18px]">
                           <BsSuitcase2 style={{ height: 25 }}/>
                           <p className="pr-[8px]">{trip.bigSuitcase}</p>
                           <BsSuitcaseLg style={{ height: 25}}/>
                           <p className="pr-[8px]">{trip.smallSuitcase}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <BottomNavigation currentScreen="trip" onNavigate={onNavigate} />
      </div>
   );
}
