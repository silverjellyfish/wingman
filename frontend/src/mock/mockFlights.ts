// Contributors: Michelle
// Time: 0.5 hours

export interface Flight {
  code: string;
  from: string;
  to: string;
  launch: string;
  landing: string;
  boarding: string;
  date: string;
}

export const mockFlights: Flight[] = [
  {
    code: "WN1234",
    from: "BNA",
    to: "CMH",
    launch: "11:00 PM",
    landing: "12:00 AM",
    boarding: "10:30 PM",
    date: "2025-10-22",
  },
  {
    code: "WN1234",
    from: "ANA",
    to: "CMH",
    launch: "10:00 AM",
    landing: "12:00 PM",
    boarding: "09:30 AM",
    date: "2025-10-22",
  },
  {
    code: "WN1234",
    from: "ANA",
    to: "CAT",
    launch: "01:00 pM",
    landing: "08:00 PM",
    boarding: "12:30 PM",
    date: "2025-10-20",
  },
  {
    code: "WN5678",
    from: "BNA",
    to: "ATL",
    launch: "11:00 AM",
    landing: "01:30 PM",
    boarding: "10:30 AM",
    date: "2025-10-21",
  },
  {
    code: "DL4321",
    from: "BNA",
    to: "JFK",
    launch: "02:00 PM",
    landing: "04:30 PM",
    boarding: "01:30 PM",
    date: "2025-10-20",
  },
  {
    code: "AA8765",
    from: "BNA",
    to: "LAX",
    launch: "05:00 PM",
    landing: "07:30 PM",
    boarding: "04:30 PM",
    date: "2025-10-22",
  },
];
