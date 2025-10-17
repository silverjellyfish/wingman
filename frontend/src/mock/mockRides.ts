// Contributors: Michelle
import type { User } from "@/types";

export interface Pod {
  id: string;
  num_members: number;
  members: User[];
  pickup_time: string; 
  location: {
    type: "Point";
    coordinates: [number, number]; 
  };
  num_big_luggage: number;
  num_small_luggage: number;
  created_at: string;
  updated_at: string;
}

// Mock users
const mockUsers: User[] = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com", createdAt: "2025-10-01" },
  { id: "u2", name: "Bob Smith", email: "bob@example.com", createdAt: "2025-10-02" },
  { id: "u3", name: "Charlie Brown", email: "charlie@example.com", createdAt: "2025-10-03" },
  { id: "u4", name: "Dana White", email: "dana@example.com", createdAt: "2025-10-04" },
  { id: "u5", name: "Eve Davis", email: "eve@example.com", createdAt: "2025-10-05" },
];

// Mock pods
export const mockPods: Pod[] = [
  {
    id: "p1",
    num_members: 2,
    members: [mockUsers[0], mockUsers[1]],
    pickup_time: new Date("2025-10-20T08:30:00").toISOString(),
    location: { type: "Point", coordinates: [-86.7816, 36.1661] }, 
    num_big_luggage: 1,
    num_small_luggage: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p2",
    num_members: 1,
    members: [mockUsers[2]],
    pickup_time: new Date("2025-10-20T09:00:00").toISOString(),
    location: { type: "Point", coordinates: [-86.7890, 36.1627] },
    num_big_luggage: 0,
    num_small_luggage: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p3",
    num_members: 3,
    members: [mockUsers[3], mockUsers[4], mockUsers[0]],
    pickup_time: new Date("2025-10-20T09:15:00").toISOString(),
    location: { type: "Point", coordinates: [-86.7769, 36.1640] },
    num_big_luggage: 2,
    num_small_luggage: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
