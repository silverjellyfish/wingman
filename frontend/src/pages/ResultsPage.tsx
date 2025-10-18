import { useState } from "react";
import { Button } from "../components/ui/button";
import { BottomNavigation } from "../components/layout/BottomNavigation";
import { FlightResultCard } from "../components/FlightResultCard";
import { GroupOptionCard } from "../components/GroupOptionCard";

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
   | "profile"
   | "results";

interface Flight {
   id: string;
   flightCode: string;
   dateRange: string;
   route: string;
   airports: string;
   boardingTime: string;
   departureTime: string;
   arrivalTime: string;
}

interface GroupMember {
   name: string;
   initial: string;
   isEmpty?: boolean;
}

interface RideshareOption {
   id: number;
   isRecommended: boolean;
   members: GroupMember[];
   location: string;
   luggageCount: number;
   time: string;
}

interface ResultsPageProps {
   onNavigate: (screen: Screen) => void;
   selectedFlight: Flight;
}

export function ResultsPage({ onNavigate, selectedFlight }: ResultsPageProps) {
   // Mock data - in production this would come from API
   const [options] = useState<RideshareOption[]>([
      {
         id: 1,
         isRecommended: true,
         members: [
            { name: "Vince L.", initial: "V" },
            { name: "Samantha H.", initial: "S" },
            { name: "Lana C.", initial: "L" },
            { name: "Empty", initial: "", isEmpty: true },
         ],
         location: "Rothschild College",
         luggageCount: 2,
         time: "7/20 - 7:15 PM",
      },
      {
         id: 2,
         isRecommended: false,
         members: [
            { name: "Vince L.", initial: "V" },
            { name: "Samantha H.", initial: "S" },
            { name: "Lana C.", initial: "L" },
            { name: "Empty", initial: "", isEmpty: true },
         ],
         location: "Rothschild College",
         luggageCount: 2,
         time: "7/20 - 7:15 PM",
      },
   ]);

   const handleAccept = (optionId: number) => {
      console.log("Accepted option:", optionId);
      // Navigate to ride screen
      onNavigate("ride");
   };

   return (
      <div className="bg-[#16161b] relative rounded-[40px] size-full">
         <div className="flex flex-col items-center size-full">
            <div className="box-border content-stretch flex flex-col items-center justify-between overflow-clip p-[12px] relative size-full">
               {/* Main Content */}
               <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
                  <div className="flex flex-col items-center size-full">
                     <div className="box-border content-stretch flex flex-col gap-[40px] items-center px-[12px] py-[40px] relative size-full">
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
                        <div className="content-stretch flex items-start relative shrink-0 w-full pointer-events-none">
                           <FlightResultCard
                              flight={selectedFlight}
                              isExpanded={false}
                              onExpand={() => {}}
                              onSelect={() => {}}
                           />
                        </div>

                        {/* Groups Section */}
                        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                           <p className="font-['Geist:SemiBold',_sans-serif] font-semibold leading-none relative text-[18px] text-white tracking-[0.07px] w-full">
                              Groups
                           </p>

                           {/* Option Cards */}
                           <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                              {options.map((option) => (
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
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Bottom Navigation */}
               <BottomNavigation currentScreen="ride" onNavigate={onNavigate} />
            </div>
         </div>
      </div>
   );
}
