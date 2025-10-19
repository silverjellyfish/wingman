// Contributors: Michelle

import { useEffect } from "react";
import "@/pages/styles/LoadingScreen.css";

interface LoadingScreenProps {
  onNavigate: (...args: any[]) => void;
  payload: any;
}

export function LoadingScreen({ onNavigate, payload }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate("rideWithGroup", undefined, undefined, payload);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onNavigate, payload]);

  return (
    <div className="loading-container">
      <p className="loading-text">Searching for rides...</p>
      <div className="progress-bar">
        <div className="progress-bar-fill" />
      </div>
    </div>
  );
}
