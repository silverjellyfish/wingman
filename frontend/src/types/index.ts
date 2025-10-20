// Contributors: Vince, Samantha, Michelle
// Time: 0.5 hours
// TODO: Consolidate this.

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  deleteAccount: (userId: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

// export interface Flight {
//   id: string;
//   airline: string;
//   flightNumber: string;
//   departure: string;
//   arrival: string;
//   departureTime: string;
//   arrivalTime: string;
//   price: number;
// }

export interface Flight {
  code: string;
  from: string;
  to: string;
  launch: string;
  landing: string;
  boarding: string;
  date: string;
}

export type Screen =
  | "login"
  | "register"
  | "profileInfo"
  | "app"
  | "ride"
  | "flightInput"
  | "flightDate"
  | "loading"
  | "groupMatching"
  | "flightResults"
  | "groupDetail"
  | "rideWithGroup"
  | "trip"
  | "profile"
  | "flightPreferences"
  | "createPod";
