import { BottomNavigation } from "../components/layout/BottomNavigation";

type Screen = 'ride' | 'flightInput' | 'flightDate' | 'loading' | 'groupMatching' | 'flightResults' | 'flightPreferences' | 'groupDetail' | 'rideWithGroup' | 'trip' | 'profile';

interface RideScreenProps {
  onNavigate: (screen: Screen) => void;
  hasJoinedGroup: boolean;
}

export function RideScreen({ onNavigate, hasJoinedGroup }: RideScreenProps) {
  return (
    <div className="flex flex-col justify-between h-full bg-[#16161b] text-white p-6">
      <div>
        <h1 className="text-2xl font-medium mb-6">Find Your Ride</h1>

        <button
          onClick={() => onNavigate('flightInput')}
          className="w-full bg-[#28282d] hover:bg-[#32323d] text-white py-4 px-6 rounded-lg mb-4 transition-colors"
        >
          Search for Flights
        </button>

        {hasJoinedGroup && (
          <button
            onClick={() => onNavigate('groupDetail')}
            className="w-full bg-[#28282d] hover:bg-[#32323d] text-white py-4 px-6 rounded-lg mb-4 transition-colors"
          >
            View My Group
          </button>
        )}
      </div>

      <BottomNavigation currentScreen="ride" onNavigate={onNavigate} />
    </div>
  );
}
