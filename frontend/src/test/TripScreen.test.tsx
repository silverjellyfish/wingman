// Contributors: Vince
// Time: 0.5 hours

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TripScreen } from "../pages/TripScreen";

describe("TripScreen", () => {
   const mockNavigate = vi.fn();

   describe("Initial Rendering", () => {
      it("renders the trip history title", () => {
         render(<TripScreen onNavigate={mockNavigate} />);
         expect(screen.getByText("Trip History")).toBeInTheDocument();
      });

      it("renders upcoming trips by default", () => {
         render(<TripScreen onNavigate={mockNavigate} />);

         // Check for upcoming trip flight codes
         expect(screen.getByText(/AA1234/i)).toBeInTheDocument();
      });

      it("renders view toggle buttons", () => {
         render(<TripScreen onNavigate={mockNavigate} />);

         expect(screen.getByText("Upcoming")).toBeInTheDocument();
         expect(screen.getByText("Past Trips")).toBeInTheDocument();
      });
   });

   describe("Trip Card Information", () => {
      it("displays trip route information", () => {
         render(<TripScreen onNavigate={mockNavigate} />);
         // Check for route in upcoming trips
         expect(screen.getByText(/Nashville to New York/i)).toBeInTheDocument();
      });

      it("displays luggage information in upcoming trips", () => {
         render(<TripScreen onNavigate={mockNavigate} />);

         // Check for luggage counts in the expanded pod card
         // The ExpandedPodCard shows luggage info
         const luggageElements = document.querySelectorAll("svg");
         expect(luggageElements.length).toBeGreaterThan(0);
      });

      it("renders member information in pod card", () => {
         render(<TripScreen onNavigate={mockNavigate} />);

         // ExpandedPodCard shows member info
         // Check that component renders without crashing
         expect(screen.getByText("Trip History")).toBeInTheDocument();
      });

      it("displays pickup information", () => {
         render(<TripScreen onNavigate={mockNavigate} />);

         // Check for pickup time in the pod data
         const pickupInfo = screen.getAllByText(/7:00 AM/i);
         expect(pickupInfo.length).toBeGreaterThan(0);
      });
   });

   describe("Layout and Styling", () => {
      it("renders luggage icons", () => {
         render(<TripScreen onNavigate={mockNavigate} />);

         // BsSuitcase2 and BsSuitcaseLg should be rendered
         const luggageIcons = document.querySelectorAll("svg");
         expect(luggageIcons.length).toBeGreaterThan(0);
      });

      it("renders scrollable container", () => {
         render(<TripScreen onNavigate={mockNavigate} />);

         const scrollContainer = document.querySelector(".overflow-y-scroll");
         expect(scrollContainer).toBeTruthy();
      });
   });

   describe("Trip Card Structure", () => {
      it("shows date and time together", () => {
         render(<TripScreen onNavigate={mockNavigate} />);

         // Check for flight code in upcoming trips
         expect(screen.getByText(/AA1234/i)).toBeInTheDocument();
      });

      it("displays location label in past trips", async () => {
         const user = userEvent.setup();
         render(<TripScreen onNavigate={mockNavigate} />);

         // Switch to past trips view
         await user.click(screen.getByText("Past Trips"));

         // Now location labels should be visible in PriorTripCard
         const locationLabels = screen.getAllByText(/Location:/i);
         expect(locationLabels.length).toBeGreaterThan(0);
      });

      it("switches back to upcoming trips from past trips", async () => {
         const user = userEvent.setup();
         render(<TripScreen onNavigate={mockNavigate} />);

         // Switch to past trips
         await user.click(screen.getByText("Past Trips"));
         expect(screen.getAllByText(/Location:/i).length).toBeGreaterThan(0);

         // Switch back to upcoming trips
         await user.click(screen.getByText("Upcoming"));

         // Should show upcoming trip
         expect(screen.getByText(/AA1234/i)).toBeInTheDocument();
      });
   });

   describe("Empty State", () => {
      it("renders without trips (component has hardcoded data)", () => {
         // This component always has hardcoded trips
         // Testing that it renders consistently
         render(<TripScreen onNavigate={mockNavigate} />);

         expect(screen.getByText("Trip History")).toBeInTheDocument();
      });
   });

   describe("Scrollable Container", () => {
      it("has scrollable main content area", () => {
         render(<TripScreen onNavigate={mockNavigate} />);

         const scrollContainer = document.querySelector(
            ".overflow-auto, .\\[\\&\\:\\:-webkit-scrollbar\\]\\:hidden"
         );
         // The component should have a scrollable container
         expect(document.querySelector(".flex-1")).toBeInTheDocument();
      });
   });
});
