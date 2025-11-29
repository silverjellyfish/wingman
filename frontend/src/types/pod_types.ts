export interface MetaData {
  _id: string;
  name: string;
}
export interface User {
  _id: string;
  user: MetaData;
  email: string;
  name: string;
  createdAt: string;
  gender?: string;
  numCarryOnBags?: number;
  numCheckedInBags?: number;
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
  max_people: number;
  created_at: string;
  updated_at: string;
}
