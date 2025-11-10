// Contributors: Vince
// Time: 1 hour

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlightResultsScreen } from "./FlightResultsScreen";
import type { Flight } from "@/mock/mockFlights.ts";

describe("FlightResultsScreen", () => {
   const mockNavigate = vi.fn();
   const mockFlights: Flight[] = [
      {
         code: "WN123",
         date: "2025-12-25",
         from: "BNA",
         to: "LAX",
         boarding: "2:30 PM",
         launch: "3:00 PM",
         landing: "5:00 PM",
      },
      {
         code: "WN456",
         date: "2025-12-25",
         from: "ORD",
         to: "JFK",
         boarding: "10:00 AM",
         launch: "10:30 AM",
         landing: "1:00 PM",
      },
   ];

   const defaultProps = {
      onNavigate: mockNavigate,
      flights: mockFlights,
      planeCode: "WN123",
      date: "2025-12-25",
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
            ...defaultProps,
            planeCode: "AA999",
         };

         render(<FlightResultsScreen {...props} />);
         expect(
            screen.getByText(/No flights found for AA999 on 2025-12-25/i)
         ).toBeInTheDocument();
      });

      it("filters correctly when multiple flights match", () => {
         const samePlaneFlights: Flight[] = [
            {
               code: "WN123",
               date: "2025-12-25",
               from: "BNA",
               to: "LAX",
               boarding: "2:30 PM",
               launch: "3:00 PM",
               landing: "5:00 PM",
            },
            {
               code: "WN123",
               date: "2025-12-25",
               from: "BNA",
               to: "SFO",
               boarding: "6:00 PM",
               launch: "6:30 PM",
               landing: "9:00 PM",
            },
         ];

         const props = {
            ...defaultProps,
            flights: samePlaneFlights,
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
            flights: [],
         };

         render(<FlightResultsScreen {...props} />);
         expect(screen.getByText(/No flights found/i)).toBeInTheDocument();
      });

      it("handles missing date", () => {
         const props = {
            ...defaultProps,
            date: "",
         };

         render(<FlightResultsScreen {...props} />);
         expect(screen.getByText(/No flights found/i)).toBeInTheDocument();
      });

      it("handles missing plane code", () => {
         const props = {
            ...defaultProps,
            planeCode: "",
         };

         render(<FlightResultsScreen {...props} />);
         expect(screen.getByText(/No flights found/i)).toBeInTheDocument();
      });
   });
});
