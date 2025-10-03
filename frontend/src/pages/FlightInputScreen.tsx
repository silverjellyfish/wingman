import { useState } from 'react';

type Screen = 'ride' | 'flightInput' | 'flightDate' | 'loading' | 'groupMatching' | 'flightResults' | 'flightPreferences' | 'groupDetail' | 'rideWithGroup' | 'trip' | 'profile';

interface FlightInputScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function FlightInputScreen({ onNavigate }: FlightInputScreenProps) {
  const [flightNumber, setFlightNumber] = useState('');

  const handleContinue = () => {
    if (flightNumber.trim()) {
      onNavigate('flightDate');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-6">
      <button
        onClick={() => onNavigate('ride')}
        className="self-start mb-6 text-sm text-gray-400 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-medium mb-6">Enter Flight Details</h1>

      <div className="flex-1">
        <label className="block mb-2 text-sm text-gray-400">Flight Number</label>
        <input
          type="text"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          placeholder="e.g., AA1234"
          className="w-full bg-[#28282d] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
        />
      </div>

      <button
        onClick={handleContinue}
        disabled={!flightNumber.trim()}
        className="w-full bg-white text-black py-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
