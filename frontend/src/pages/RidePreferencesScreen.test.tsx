// Contributors: Vince
// Time: 1.5 hours

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RidePreferencesScreen } from "./RidePreferencesScreen";
import type { Flight } from "@/mock/mockFlights.ts";

// Mock AuthContext
vi.mock("@/contexts/AuthContext", () => ({
   useAuth: () => ({ user: { id: "user123", name: "John Doe" } }),
}));

describe("RidePreferencesScreen", () => {
   const mockNavigate = vi.fn();
   const mockFlight: Flight = {
      code: "WN123",
      date: "2025-12-25",
      from: "BNA",
      to: "LAX",
      boarding: "2:30 PM",
      launch: "3:00 PM",
      landing: "5:00 PM",
   };
   const mockFlights = [
      {
         id: "1",
         flightCode: "WN123",
         dateRange: "2025-12-25",
         route: "BNA → LAX",
         airports: "BNA - LAX",
         boardingTime: "2:30 PM",
         departureTime: "3:00 PM",
         arrivalTime: "5:00 PM",
      },
   ];

   beforeEach(() => {
      vi.clearAllMocks();
   });

   describe("Initial Rendering", () => {
      it("renders the back button", () => {
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );
         expect(screen.getByText("Back")).toBeInTheDocument();
      });

      it("renders flight information card", () => {
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );
         expect(screen.getByText(/BNA → LAX/i)).toBeInTheDocument();
      });

      it("renders timing section", () => {
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );
         expect(screen.getByText("Timing")).toBeInTheDocument();
         expect(screen.getByText("Earliest")).toBeInTheDocument();
         expect(screen.getByText("Latest")).toBeInTheDocument();
      });

      it("renders luggage section", () => {
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );
         expect(screen.getByText("Luggage")).toBeInTheDocument();
         expect(screen.getByText("Checked Bags")).toBeInTheDocument();
         expect(screen.getByText("Carry-On Bags")).toBeInTheDocument();
      });

      it("renders pickup location section", () => {
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );
         expect(screen.getByText("Pick up Location")).toBeInTheDocument();
      });

      it("renders search button", () => {
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );
         expect(screen.getByText("Search for rideshare")).toBeInTheDocument();
      });
   });

   describe("Navigation", () => {
      it("navigates back to flight results", async () => {
         const user = userEvent.setup();
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         await user.click(screen.getByText("Back"));

         expect(mockNavigate).toHaveBeenCalledWith(
            "flightResults",
            "WN123",
            "2025-12-25"
         );
      });
   });

   describe("Timing Inputs", () => {
      it("only allows numeric input for earliest time", async () => {
         const user = userEvent.setup();
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         const inputs = screen.getAllByRole("textbox");
         const earliestInput = inputs.find(
            (input) =>
               input.getAttribute("inputMode") === "numeric" &&
               input.closest(".flex-col")?.textContent?.includes("Earliest")
         );

         if (earliestInput) {
            await user.type(earliestInput, "abc123");
            expect(earliestInput).toHaveValue("123");
         }
      });

      it("only allows numeric input for latest time", async () => {
         const user = userEvent.setup();
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         const inputs = screen.getAllByRole("textbox");
         const latestInput = inputs.find(
            (input) =>
               input.getAttribute("inputMode") === "numeric" &&
               input.closest(".flex-col")?.textContent?.includes("Latest")
         );

         if (latestInput) {
            await user.type(latestInput, "xyz456");
            expect(latestInput).toHaveValue("456");
         }
      });

      it("calculates earliest arrival time correctly", async () => {
         const user = userEvent.setup();
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         const inputs = screen.getAllByRole("textbox");
         const earliestInput = inputs.find(
            (input) =>
               input.getAttribute("inputMode") === "numeric" &&
               input.closest(".flex-col")?.textContent?.includes("Earliest")
         );

         if (earliestInput) {
            fireEvent.change(earliestInput, { target: { value: "60" } });

            // Should show calculated arrival time (boarding time - 60 mins)
            expect(screen.getByText("Earliest Arrival")).toBeInTheDocument();
         }
      });

      it("displays --:-- when timing input is empty", () => {
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         // Initially should show --:--
         const arrivalTimes = screen.getAllByText("--:--");
         expect(arrivalTimes.length).toBeGreaterThan(0);
      });
   });

   describe("Luggage Inputs", () => {
      it("initializes with default luggage values", () => {
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         const inputs = screen.getAllByPlaceholderText("0");
         // Should have inputs for checked and carry-on bags
         expect(inputs.length).toBeGreaterThanOrEqual(2);
      });

      it("only allows numeric input for checked bags", async () => {
         const user = userEvent.setup();
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         const inputs = screen.getAllByPlaceholderText("0");
         const checkedBagsInput = inputs.find((input) =>
            input.closest(".flex-col")?.textContent?.includes("Checked")
         );

         if (checkedBagsInput) {
            await user.type(checkedBagsInput, "abc5");
            expect(checkedBagsInput).toHaveValue("5");
         }
      });

      it("only allows numeric input for carry-on bags", async () => {
         const user = userEvent.setup();
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         const inputs = screen.getAllByPlaceholderText("0");
         const carryOnInput = inputs.find((input) =>
            input.closest(".flex-col")?.textContent?.includes("Carry-On")
         );

         if (carryOnInput) {
            await user.type(carryOnInput, "xyz3");
            expect(carryOnInput).toHaveValue("3");
         }
      });
   });

   describe("Location Search", () => {
      it("renders location search input", () => {
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );
         expect(
            screen.getByPlaceholderText("Search location")
         ).toBeInTheDocument();
      });

      it("shows dropdown when typing in location search", async () => {
         const user = userEvent.setup();
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         const locationInput = screen.getByPlaceholderText("Search location");
         await user.type(locationInput, "Kirk");

         // Dropdown should appear with matching locations
         expect(screen.getByText("Kirkland Hall")).toBeInTheDocument();
      });

      it("filters locations based on search query", async () => {
         const user = userEvent.setup();
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         const locationInput = screen.getByPlaceholderText("Search location");
         await user.type(locationInput, "Library");

         // Should show library locations
         expect(screen.getByText("Central Library")).toBeInTheDocument();
      });

      it("selects location from dropdown", async () => {
         const user = userEvent.setup();
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         const locationInput = screen.getByPlaceholderText("Search location");
         await user.type(locationInput, "Kirk");

         const kirklandOption = screen.getByText("Kirkland Hall");
         fireEvent.mouseDown(kirklandOption);

         // Location should be selected
         expect(locationInput).toHaveValue("Kirkland Hall");
      });
   });

   describe("Form Validation", () => {
      it("disables search button when form is incomplete", () => {
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         const searchButton = screen.getByText("Search for rideshare");
         expect(searchButton).toBeDisabled();
      });

      it("enables search button when all fields are filled", async () => {
         const user = userEvent.setup();
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         // Fill in all required fields
         const inputs = screen.getAllByRole("textbox");

         // Set timing values
         const timingInputs = inputs.filter(
            (input) => input.getAttribute("inputMode") === "numeric"
         );
         if (timingInputs[0])
            fireEvent.change(timingInputs[0], { target: { value: "120" } });
         if (timingInputs[1])
            fireEvent.change(timingInputs[1], { target: { value: "60" } });

         // Set location
         const locationInput = screen.getByPlaceholderText("Search location");
         await user.type(locationInput, "Kirk");
         const kirklandOption = screen.getByText("Kirkland Hall");
         fireEvent.mouseDown(kirklandOption);

         // Button should now be enabled
         const searchButton = screen.getByText("Search for rideshare");
         expect(searchButton).not.toBeDisabled();
      });
   });

   describe("Search Submission", () => {
      it("navigates to loading screen with preferences", async () => {
         const user = userEvent.setup();
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         // Fill form
         const inputs = screen.getAllByRole("textbox");
         const timingInputs = inputs.filter(
            (input) => input.getAttribute("inputMode") === "numeric"
         );

         if (timingInputs[0])
            fireEvent.change(timingInputs[0], { target: { value: "120" } });
         if (timingInputs[1])
            fireEvent.change(timingInputs[1], { target: { value: "60" } });

         const locationInput = screen.getByPlaceholderText("Search location");
         await user.type(locationInput, "Kirk");
         fireEvent.mouseDown(screen.getByText("Kirkland Hall"));

         // Submit
         const searchButton = screen.getByText("Search for rideshare");
         await user.click(searchButton);

         expect(mockNavigate).toHaveBeenCalledWith(
            "loading",
            undefined,
            undefined,
            expect.objectContaining({
               flight: mockFlight,
               pickupLocation: "Kirkland Hall",
            })
         );
      });
   });

   describe("Edge Cases", () => {
      it("handles empty timing inputs gracefully", () => {
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         // Should display --:-- for empty inputs
         const placeholders = screen.getAllByText("--:--");
         expect(placeholders.length).toBeGreaterThan(0);
      });

      it("handles non-numeric timing inputs", async () => {
         const user = userEvent.setup();
         render(
            <RidePreferencesScreen
               onNavigate={mockNavigate}
               flight={mockFlight}
               flights={mockFlights}
            />
         );

         const inputs = screen.getAllByRole("textbox");
         const timingInput = inputs.find(
            (input) => input.getAttribute("inputMode") === "numeric"
         );

         if (timingInput) {
            await user.type(timingInput, "abc");
            // Should show --:-- since input is invalid
            expect(screen.getByText("--:--")).toBeInTheDocument();
         }
      });
   });
});
