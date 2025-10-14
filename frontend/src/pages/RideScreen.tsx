import { useState } from "react";
import { BottomNavigation } from "../components/layout/BottomNavigation";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { useAuth } from "../contexts/AuthContext";

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

interface RideScreenProps {
   onNavigate: (screen: Screen) => void;
   hasJoinedGroup: boolean;
}

export function RideScreen({ onNavigate, hasJoinedGroup }: RideScreenProps) {
   const { user } = useAuth();
   const firstName = user?.name?.split(" ")[0] || "there";
   const [isInputFocused, setIsInputFocused] = useState(false);
   const [planeCode, setPlaneCode] = useState("");

   return (
      <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
         {/* Main Content - Scrollable */}
         <div className="flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] pt-[80px] px-[40px] w-full">
               {/* Header */}
               <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
                  <p className="leading-none" style={{ fontWeight: 600 }}>
                     Hello {firstName}
                  </p>
               </div>

               {/* Form Fields */}

               {!isInputFocused ? (
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
                     <Input
                        type="search"
                        placeholder="Search for flight"
                        icon={
                           <span className="material-symbols-outlined text-[24px]">
                              search
                           </span>
                        }
                        onFocus={() => setIsInputFocused(true)}
                     />
                  </div>
               ) : (
                  <div className="content-stretch flex flex-row gap-[16px] items-start relative w-full">
                     <Input
                        type="text"
                        placeholder="Plane code (e.g. WN123)"
                        value={planeCode}
                        onChange={(e) => setPlaneCode(e.target.value)}
                        onBlur={() => setIsInputFocused(false)}
                        autoFocus
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                     />
                     <Button
                        className="w-1/4 mt-4"
                        disabled={!planeCode.trim()}
                     >
                        Next
                     </Button>
                  </div>
               )}
            </div>
         </div>
         <BottomNavigation currentScreen="ride" onNavigate={onNavigate} />
      </div>
   );
}
