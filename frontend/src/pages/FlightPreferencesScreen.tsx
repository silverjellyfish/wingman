import { useState } from 'react';

type Screen = 'ride' | 'flightInput' | 'flightDate' | 'loading' | 'groupMatching' | 'flightResults' | 'flightPreferences' | 'groupDetail' | 'rideWithGroup' | 'trip' | 'profile';

interface FlightPreferencesScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function FlightPreferencesScreen({ onNavigate }: FlightPreferencesScreenProps) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');

  const locations = [
    'Vanderbilt Main Entrance',
    'Commons Center',
    'Engineering Building',
    'Student Recreation Center',
  ];

  return (
    <div className="flex flex-col h-full bg-[#16161b] text-white p-6">
      <button
        onClick={() => onNavigate('ride')}
        className="self-start mb-6 text-sm text-gray-400 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-medium mb-6">Set Preferences</h1>

      <div className="flex-1 space-y-6">
        <div>
          <label className="block mb-2 text-sm text-gray-400">Pickup Location</label>
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full bg-[#28282d] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="">Select location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-400">Dropoff Location</label>
          <select
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            className="w-full bg-[#28282d] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="">Select location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={() => onNavigate('groupMatching')}
        disabled={!pickupLocation || !dropoffLocation}
        className="w-full bg-white text-black py-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
      >
        Save Preferences
      </button>
    </div>
  );
}
