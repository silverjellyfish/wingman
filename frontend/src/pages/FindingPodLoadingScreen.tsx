// Contributors: Michelle

import { useEffect } from "react";
import type { Screen } from "@/types";
import "@/pages/styles/LoadingScreen.css";

interface LoadingScreenProps {
  onNavigate: (
    screen: Screen,
    planeCode?: string,
    date?: string,
    payload?: any
  ) => void;
  flight: any;
}

export function LoadingScreen({ onNavigate, flight }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate("rideWithGroup", undefined, undefined, flight);
    }, 3000); // 3 seconds total animation
    return () => clearTimeout(timer);
  }, [onNavigate, flight]);

  return (
    <div className="loading-container">
      <p className="loading-text">Searching for rides...</p>
      <div className="progress-bar">
        <div className="progress-bar-fill" />
      </div>
    </div>
  );
}
