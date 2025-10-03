import { useState } from 'react';

type Screen = 'ride' | 'flightInput' | 'flightDate' | 'loading' | 'groupMatching' | 'flightResults' | 'flightPreferences' | 'groupDetail' | 'rideWithGroup' | 'trip' | 'profile';

interface FlightDateScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function FlightDateScreen({ onNavigate }: FlightDateScreenProps) {
  const [date, setDate] = useState('');

  const handleContinue = () => {
    if (date) {
      onNavigate('loading');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-6">
      <button
        onClick={() => onNavigate('flightInput')}
        className="self-start mb-6 text-sm text-gray-400 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-medium mb-6">Select Flight Date</h1>

      <div className="flex-1">
        <label className="block mb-2 text-sm text-gray-400">Departure Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-[#28282d] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
        />
      </div>

      <button
        onClick={handleContinue}
        disabled={!date}
        className="w-full bg-white text-black py-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
      >
        Find Matches
      </button>
    </div>
  );
}
