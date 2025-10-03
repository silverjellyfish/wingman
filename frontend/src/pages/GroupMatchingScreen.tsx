type Screen = 'ride' | 'flightInput' | 'flightDate' | 'loading' | 'groupMatching' | 'flightResults' | 'flightPreferences' | 'groupDetail' | 'rideWithGroup' | 'trip' | 'profile';

interface GroupMatchingScreenProps {
  onNavigate: (screen: Screen) => void;
  onJoinGroup: () => void;
}

export function GroupMatchingScreen({ onNavigate, onJoinGroup }: GroupMatchingScreenProps) {
  const groups = [
    { id: 1, destination: 'Nashville Airport', time: '3:00 PM', members: 3, maxMembers: 4 },
    { id: 2, destination: 'Nashville Airport', time: '3:30 PM', members: 2, maxMembers: 4 },
  ];

  const handleJoinGroup = (groupId: number) => {
    onJoinGroup();
  };

  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-6">
      <button
        onClick={() => onNavigate('ride')}
        className="self-start mb-6 text-sm text-gray-400 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-medium mb-6">Available Groups</h1>

      <div className="flex-1 space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="bg-[#28282d] p-4 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium">{group.destination}</h3>
                <p className="text-sm text-gray-400">{group.time}</p>
              </div>
              <span className="text-sm text-gray-400">
                {group.members}/{group.maxMembers}
              </span>
            </div>
            <button
              onClick={() => handleJoinGroup(group.id)}
              className="w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Join Group
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
