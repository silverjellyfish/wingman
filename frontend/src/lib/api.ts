// Contributors: Vince

import type { Trip, Flight } from '@/types';
import { auth } from '@/lib/firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : null;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

export const api = {
  // Trips endpoints
  trips: {
    getAll: (): Promise<Trip[]> => fetchAPI('/trips'),
    getById: (id: string): Promise<Trip> => fetchAPI(`/trips/${id}`),
    create: (data: Partial<Trip>) =>
      fetchAPI('/trips', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<Trip>) =>
      fetchAPI(`/trips/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchAPI(`/trips/${id}`, {
        method: 'DELETE',
      }),
  },

  // Flights endpoints
  flights: {
    search: (params: {
      origin: string;
      destination: string;
      date: string;
    }): Promise<Flight[]> => {
      const query = new URLSearchParams(params).toString();
      return fetchAPI(`/flights/search?${query}`);
    },
    getById: (id: string): Promise<Flight> => fetchAPI(`/flights/${id}`),
  },
};
