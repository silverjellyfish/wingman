export interface User {
  _id: string;
  user: string;
  email: string;
  name: string;
  createdAt: string;
  gender?: string;
}

export interface Pod {
  _id: string;
  num_members: number;
  members: User[];
  pickup_time: string;
  pickup_location: { name: string };
  dropoffLocation: string;
  location: {
    _id: string;
    name: string;
    address: string;
    type: "airport" | "university" | "hotel" | "landmark";
  };
  num_big_luggage: number;
  num_small_luggage: number;
  created_at: string;
  updated_at: string;
}
