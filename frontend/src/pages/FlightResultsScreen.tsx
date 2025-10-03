type Screen = 'ride' | 'flightInput' | 'flightDate' | 'loading' | 'groupMatching' | 'flightResults' | 'flightPreferences' | 'groupDetail' | 'rideWithGroup' | 'trip' | 'profile';

interface FlightResultsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function FlightResultsScreen({ onNavigate }: FlightResultsScreenProps) {
  const flights = [
    { id: 1, number: 'AA1234', departure: '3:00 PM', arrival: '5:30 PM', price: '$250' },
    { id: 2, number: 'DL5678', departure: '4:15 PM', arrival: '6:45 PM', price: '$280' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-6">
      <button
        onClick={() => onNavigate('ride')}
        className="self-start mb-6 text-sm text-gray-400 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-medium mb-6">Flight Results</h1>

      <div className="flex-1 space-y-4">
        {flights.map((flight) => (
          <div key={flight.id} className="bg-[#28282d] p-4 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium">{flight.number}</h3>
                <p className="text-sm text-gray-400">
                  {flight.departure} - {flight.arrival}
                </p>
              </div>
              <span className="font-medium">{flight.price}</span>
            </div>
            <button
              onClick={() => onNavigate('groupMatching')}
              className="w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Select Flight
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
