// Contributors: Michelle

import { useEffect } from "react";
import type { Screen } from "@/types";

interface LoadingScreenProps {
  onNavigate: (screen: Screen) => void;
  flight: any;
}

export function LoadingScreen({ onNavigate, flight }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate("rideWithGroup");
    }, 1500);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#16161b] text-white">
      <p className="text-lg">Searching for rides...</p>
    </div>
  );
}
