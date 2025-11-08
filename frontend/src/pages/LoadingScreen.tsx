// Contributors: Michelle
// Time: 0.5 hours

import { useEffect } from "react";
import "@/pages/styles/LoadingScreen.css";

interface LoadingScreenProps {
  text?: string;
  duration?: number;
  onComplete?: () => void;
}

export function LoadingScreen({
  text = "Loading...",
  duration = 1000,
  onComplete,
}: LoadingScreenProps) {
  useEffect(() => {
    if (!onComplete) return;
    const timer = setTimeout(() => onComplete(), duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div className="loading-container">
      <p className="loading-text">{text}</p>
      <div className="spinner" />
    </div>
  );
}
