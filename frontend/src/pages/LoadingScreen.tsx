import { useEffect } from 'react';

type Screen = 'ride' | 'flightInput' | 'flightDate' | 'loading' | 'groupMatching' | 'flightResults' | 'flightPreferences' | 'groupDetail' | 'rideWithGroup' | 'trip' | 'profile';

interface LoadingScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function LoadingScreen({ onNavigate }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate('groupMatching');
    }, 2000);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white items-center justify-center">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
      <p className="text-lg">Finding matches...</p>
    </div>
  );
}
