type Screen = 'ride' | 'flightInput' | 'flightDate' | 'loading' | 'groupMatching' | 'flightResults' | 'flightPreferences' | 'groupDetail' | 'rideWithGroup' | 'trip' | 'profile';

interface RideScreenWithGroupProps {
  onNavigate: (screen: Screen) => void;
  onLeaveGroup: () => void;
}

export function RideScreenWithGroup({ onNavigate, onLeaveGroup }: RideScreenWithGroupProps) {
  const group = {
    destination: 'Nashville Airport',
    time: '3:00 PM',
    pickupLocation: 'Commons Center',
    members: 3,
  };

  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-6">
      <h1 className="text-2xl font-medium mb-6">Your Ride</h1>

      <div className="flex-1">
        <div className="bg-[#28282d] p-4 rounded-lg mb-4">
          <h3 className="font-medium mb-2">{group.destination}</h3>
          <p className="text-sm text-gray-400 mb-1">{group.time}</p>
          <p className="text-sm text-gray-400 mb-3">Pickup: {group.pickupLocation}</p>
          <p className="text-sm text-gray-400">{group.members} members</p>

          <button
            onClick={() => onNavigate('groupDetail')}
            className="w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors mt-4"
          >
            View Details
          </button>
        </div>

        <button
          onClick={onLeaveGroup}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Leave Group
        </button>
      </div>

      <div className="mt-auto">
        <nav className="flex justify-around items-center py-4 border-t border-[#28282d]">
          <button onClick={() => onNavigate('rideWithGroup')} className="flex flex-col items-center gap-1">
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
