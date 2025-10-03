type Screen = 'ride' | 'flightInput' | 'flightDate' | 'loading' | 'groupMatching' | 'flightResults' | 'flightPreferences' | 'groupDetail' | 'rideWithGroup' | 'trip' | 'profile';

interface RideScreenProps {
  onNavigate: (screen: Screen) => void;
  hasJoinedGroup: boolean;
}

export function RideScreen({ onNavigate, hasJoinedGroup }: RideScreenProps) {
  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-6">
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

      <div className="mt-auto">
        <nav className="flex justify-around items-center py-4 border-t border-[#28282d]">
          <button onClick={() => onNavigate('ride')} className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-white" />
            <span className="text-xs">Ride</span>
          </button>
          <button onClick={() => onNavigate('trip')} className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#28282d]" />
            <span className="text-xs">Trips</span>
          </button>
          <button onClick={() => onNavigate('profile')} className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#28282d]" />
            <span className="text-xs">Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
