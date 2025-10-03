type Screen = 'ride' | 'flightInput' | 'flightDate' | 'loading' | 'groupMatching' | 'flightResults' | 'flightPreferences' | 'groupDetail' | 'rideWithGroup' | 'trip' | 'profile';

interface TripScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function TripScreen({ onNavigate }: TripScreenProps) {
  const trips = [
    {
      id: 1,
      destination: 'Nashville Airport',
      date: 'Dec 20, 2024',
      time: '3:00 PM',
      members: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Mike Johnson' },
      ],
    },
    {
      id: 2,
      destination: 'Nashville Airport',
      date: 'Nov 15, 2024',
      time: '2:00 PM',
      members: [
        { id: 1, name: 'Sarah Lee' },
        { id: 2, name: 'Tom Brown' },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-6">
      <h1 className="text-2xl font-medium mb-6">Trip History</h1>

      <div className="flex-1 space-y-4">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-[#28282d] p-4 rounded-lg">
            <h3 className="font-medium mb-1">{trip.destination}</h3>
            <p className="text-sm text-gray-400 mb-3">
              {trip.date} • {trip.time}
            </p>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {trip.members.slice(0, 3).map((member) => (
                  <div
                    key={member.id}
                    className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#28282d]"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {trip.members.length} {trip.members.length === 1 ? 'member' : 'members'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <nav className="flex justify-around items-center py-4 border-t border-[#28282d]">
          <button onClick={() => onNavigate('ride')} className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#28282d]" />
            <span className="text-xs">Ride</span>
          </button>
          <button onClick={() => onNavigate('trip')} className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-white" />
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
