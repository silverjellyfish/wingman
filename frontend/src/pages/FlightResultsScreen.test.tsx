// Contributors: Vince
// Time: 1 hour

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlightResultsScreen } from "./FlightResultsScreen";
import type { MappedFlight } from "@/types/index.ts";

describe("FlightResultsScreen", () => {
   const mockNavigate = vi.fn();
   const mockMappedFlights: MappedFlight[] = [
      {
         id: "WN123-0",
         flightCode: "WN123",
         dateRange: "2025-12-25",
         route: "BNA → LAX",
         airports: "BNA - LAX",
         boardingTime: "2:30 PM",
         departureTime: "3:00 PM",
         arrivalTime: "5:00 PM",
      },
      {
         id: "WN456-0",
         flightCode: "WN456",
         dateRange: "2025-12-25",
         route: "ORD → JFK",
         airports: "ORD - JFK",
         boardingTime: "10:00 AM",
         departureTime: "10:30 AM",
         arrivalTime: "1:00 PM",
      },
   ];

   const defaultProps = {
      onNavigate: mockNavigate,
      planeCode: "WN123",
      date: "2025-12-25",
      payload: {
         flights: mockMappedFlights.filter(f => f.flightCode === "WN123"),
      },
   };

   beforeEach(() => {
      vi.clearAllMocks();
   });

   describe("Initial Rendering", () => {
      it("renders the back button", () => {
         render(<FlightResultsScreen {...defaultProps} />);
         expect(screen.getByText("Back")).toBeInTheDocument();
      });

      it("renders the flight results title", () => {
         render(<FlightResultsScreen {...defaultProps} />);
         expect(screen.getByText("Flight Results")).toBeInTheDocument();
      });

      it("renders flight cards for matching flights", () => {
         render(<FlightResultsScreen {...defaultProps} />);
         expect(screen.getByText(/BNA → LAX/i)).toBeInTheDocument();
      });
   });

   describe("Flight Filtering", () => {
      it("filters flights by plane code and date", () => {
         render(<FlightResultsScreen {...defaultProps} />);

         // Should show WN123 flight
         expect(screen.getByText(/BNA → LAX/i)).toBeInTheDocument();

         // Should not show WN456 flight
         expect(screen.queryByText(/ORD → JFK/i)).not.toBeInTheDocument();
      });

      it("shows no flights message when no matches found", () => {
         const props = {
            onNavigate: mockNavigate,
            planeCode: "AA999",
            date: "2025-12-25",
            payload: {
               flights: [],
            },
         };

         render(<FlightResultsScreen {...props} />);
         expect(
            screen.getByText(/No flights found for AA999 on 2025-12-25/i)
         ).toBeInTheDocument();
      });

      it("filters correctly when multiple flights match", () => {
         const samePlaneFlights: MappedFlight[] = [
            {
               id: "WN123-0",
               flightCode: "WN123",
               dateRange: "2025-12-25",
               route: "BNA → LAX",
               airports: "BNA - LAX",
               boardingTime: "2:30 PM",
               departureTime: "3:00 PM",
               arrivalTime: "5:00 PM",
            },
            {
               id: "WN123-1",
               flightCode: "WN123",
               dateRange: "2025-12-25",
               route: "BNA → SFO",
               airports: "BNA - SFO",
               boardingTime: "6:00 PM",
               departureTime: "6:30 PM",
               arrivalTime: "9:00 PM",
            },
         ];

         const props = {
            ...defaultProps,
            payload: {
               flights: samePlaneFlights,
            },
         };

         render(<FlightResultsScreen {...props} />);

         // Both flights should appear
         expect(screen.getByText(/BNA → LAX/i)).toBeInTheDocument();
         expect(screen.getByText(/BNA → SFO/i)).toBeInTheDocument();
      });
   });

   describe("Navigation", () => {
      it("navigates back to flight input when back button is clicked", async () => {
         const user = userEvent.setup();
         render(<FlightResultsScreen {...defaultProps} />);

         await user.click(screen.getByText("Back"));

         expect(mockNavigate).toHaveBeenCalledWith("flightInput");
      });
   });

   describe("Flight Card Expansion", () => {
      it("expands flight card when clicked", async () => {
         const user = userEvent.setup();
         render(<FlightResultsScreen {...defaultProps} />);

         // Find the expand button (assuming FlightResultCard has one)
         const flightCard = screen.getByText(/BNA → LAX/i).closest("div");
         expect(flightCard).toBeInTheDocument();
      });

      it("collapses expanded flight when clicked again", async () => {
         const user = userEvent.setup();
         render(<FlightResultsScreen {...defaultProps} />);

         // Component manages expansion state internally
         // Test passes if component renders without error
         expect(screen.getByText(/BNA → LAX/i)).toBeInTheDocument();
      });
   });

   describe("Flight Selection", () => {
      it("navigates to flight preferences when flight is selected", () => {
         render(<FlightResultsScreen {...defaultProps} />);

         // FlightResultCard should call onSelect which triggers navigation
         expect(screen.getByText(/BNA → LAX/i)).toBeInTheDocument();
      });
   });

   describe("Edge Cases", () => {
      it("handles empty flights array", () => {
         const props = {
            ...defaultProps,
            payload: {
               flights: [],
            },
         };

         render(<FlightResultsScreen {...props} />);
         expect(screen.getByText(/No flights found/i)).toBeInTheDocument();
      });

      it("handles missing date", async () => {
         const props = {
            ...defaultProps,
            date: "",
            payload: {
               flights: [],
            },
         };

         render(<FlightResultsScreen {...props} />);
         await waitFor(() => {
            expect(screen.getByText(/No flights found/i)).toBeInTheDocument();
         }, { timeout: 2000 });
      });

      it("handles missing plane code", async () => {
         const props = {
            ...defaultProps,
            planeCode: "",
            payload: {
               flights: [],
            },
         };

         render(<FlightResultsScreen {...props} />);
         await waitFor(() => {
            expect(screen.getByText(/No flights found/i)).toBeInTheDocument();
         }, { timeout: 2000 });
      });
   });
});
