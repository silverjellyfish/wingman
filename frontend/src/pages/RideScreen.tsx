// Contributors: Vince, Michelle

import { useState } from "react";
import { BottomNavigation } from "../components/layout/BottomNavigation";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { useAuth } from "../contexts/AuthContext";
import type { Screen } from "@/types/index.ts";

interface RideScreenProps {
  onNavigate: (screen: Screen, planeCode?: string) => void;
  hasJoinedGroup: boolean;
}

export function RideScreen({ onNavigate }: RideScreenProps) {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "there";

  const [planeCode, setPlaneCode] = useState("");

  const handleNext = () => {
    if (!/^([A-Z]{2})(\d{1,4})$/i.test(planeCode)) {
      alert("Enter valid plane code (e.g., WN1234)");
      return;
    }
    onNavigate("flightInput", planeCode);
  };

  return (
    <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
      <div className="flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] pt-[80px] px-[40px] w-full">
          <div className="flex flex-col justify-center relative text-[32px] text-center text-white tracking-[0.12px] w-full">
            <p className="leading-none" style={{ fontWeight: 600 }}>
              Hello {firstName}
            </p>
          </div>

          <div className="content-stretch flex flex-col gap-[4px] items-start relative w-full">
            <Input
              type="text"
              placeholder="Plane code (e.g. WN1234)"
              value={planeCode}
              onChange={(e) => setPlaneCode(e.target.value.toUpperCase())}
            />
          </div>

          <Button
            className="w-full mt-4"
            disabled={!planeCode.trim()}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
      <BottomNavigation currentScreen="ride" onNavigate={onNavigate} />
    </div>
  );
}
