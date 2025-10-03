type Screen = 'ride' | 'flightInput' | 'flightDate' | 'loading' | 'groupMatching' | 'flightResults' | 'flightPreferences' | 'groupDetail' | 'rideWithGroup' | 'trip' | 'profile';

interface GroupDetailScreenProps {
  onNavigate: (screen: Screen) => void;
  onJoinGroup: () => void;
  onLeaveGroup: () => void;
}

export function GroupDetailScreen({ onNavigate, onLeaveGroup }: GroupDetailScreenProps) {
  const group = {
    id: 1,
    destination: 'Nashville Airport',
    time: '3:00 PM',
    pickupLocation: 'Commons Center',
    members: [
      { id: 1, name: 'John Doe', avatar: '/avatar1.png' },
      { id: 2, name: 'Jane Smith', avatar: '/avatar2.png' },
      { id: 3, name: 'Mike Johnson', avatar: '/avatar3.png' },
    ],
  };

  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-6">
      <button
        onClick={() => onNavigate('ride')}
        className="self-start mb-6 text-sm text-gray-400 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-medium mb-6">Group Details</h1>

      <div className="flex-1 space-y-6">
        <div className="bg-[#28282d] p-4 rounded-lg">
          <div className="mb-4">
            <h3 className="font-medium mb-1">{group.destination}</h3>
            <p className="text-sm text-gray-400">{group.time}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">Pickup Location</p>
            <p className="font-medium">{group.pickupLocation}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-2">Members ({group.members.length})</p>
            <div className="space-y-2">
              {group.members.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-600" />
                  <span className="text-sm">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onLeaveGroup}
        className="w-full bg-red-600 text-white py-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
      >
        Leave Group
      </button>
    </div>
  );
}
