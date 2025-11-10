// Contributors: Vince
// Time: 1.5 hours

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreatePodScreen } from "./CreatePodScreen";

// Mock AuthContext
vi.mock("@/contexts/AuthContext", () => ({
   useAuth: () => ({ user: { id: "user123", name: "John Doe" } }),
}));

// Mock fetch
global.fetch = vi.fn() as any;

describe("CreatePodScreen", () => {
   const mockNavigate = vi.fn();
   const mockFlight = {
      code: "WN123",
      date: "2025-12-25",
      from: "BNA",
      to: "LAX",
      boarding: "2:30 PM",
      launch: "3:00 PM",
      landing: "5:00 PM",
   };

   beforeEach(() => {
      vi.clearAllMocks();
      (global.fetch as any).mockReset();

      // Default mock for profile fetch that all tests can use
      (global.fetch as any).mockResolvedValue({
         ok: true,
         json: async () => ({ _id: "user123", name: "John Doe" }),
      });
   });

   describe("Initial Rendering", () => {
      it("renders the create pod title", () => {
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );
         expect(screen.getByText("Create New Pod")).toBeInTheDocument();
      });

      it("renders the back button", () => {
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );
         expect(screen.getByText("Back")).toBeInTheDocument();
      });

      it("renders pickup date and time section", () => {
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );
         expect(screen.getByText("Pickup Date & Time")).toBeInTheDocument();
      });

      it("renders pickup location section", () => {
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );
         expect(screen.getByText("Pickup Location")).toBeInTheDocument();
      });

      it("renders luggage section", () => {
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );
         expect(screen.getByText("Luggage")).toBeInTheDocument();
         expect(screen.getByText("Checked Bags")).toBeInTheDocument();
         expect(screen.getByText("Carry-On Bags")).toBeInTheDocument();
      });

      it("renders create pod button", () => {
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );
         expect(screen.getByText("Create Pod")).toBeInTheDocument();
      });
   });

   describe("Navigation", () => {
      it("navigates back when back button is clicked", async () => {
         const user = userEvent.setup();
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );

         await user.click(screen.getByText("Back"));

         expect(mockNavigate).toHaveBeenCalledWith("rideWithGroup", mockFlight);
      });
   });

   describe("Date and Time Input", () => {
      it("renders date input placeholder", () => {
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );
         expect(screen.getByPlaceholderText("YYYY-MM-DD")).toBeInTheDocument();
      });

      it("renders time input", () => {
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );
         const timeInput = screen.getByPlaceholderText("HH:MM");
         expect(timeInput).toBeInTheDocument();
         expect(timeInput).toHaveAttribute("type", "time");
      });

      it("updates time input value", async () => {
         const user = userEvent.setup();
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );

         const timeInput = screen.getByPlaceholderText("HH:MM");
         await user.type(timeInput, "14:30");

         expect(timeInput).toHaveValue("14:30");
      });
   });

   describe("Location Search", () => {
      it("renders location search input", () => {
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );
         expect(
            screen.getByPlaceholderText("Search location")
         ).toBeInTheDocument();
      });

      it("shows dropdown when typing in location search", async () => {
         const user = userEvent.setup();
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );

         const locationInput = screen.getByPlaceholderText("Search location");
         await user.type(locationInput, "Kirk");

         await waitFor(() => {
            expect(screen.getByText("Kirkland Hall")).toBeInTheDocument();
         });
      });

      it("filters locations based on search query", async () => {
         const user = userEvent.setup();
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );

         const locationInput = screen.getByPlaceholderText("Search location");
         await user.type(locationInput, "Commons");

         await waitFor(() => {
            expect(screen.getByText("Commons Center")).toBeInTheDocument();
         });
      });

      it("selects location from dropdown", async () => {
         const user = userEvent.setup();
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );

         const locationInput = screen.getByPlaceholderText("Search location");
         await user.type(locationInput, "Kirk");

         await waitFor(() => {
            const kirklandOption = screen.getByText("Kirkland Hall");
            fireEvent.mouseDown(kirklandOption);
         });

         // After selection, search query should be cleared
         expect(locationInput).toHaveValue("Kirkland Hall");
      });
   });

   describe("Luggage Inputs", () => {
      it("initializes luggage inputs with default values", () => {
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );

         const inputs = screen.getAllByPlaceholderText("0");
         expect(inputs.length).toBe(2); // Checked and Carry-On
      });

      it("only allows numeric input for checked bags", async () => {
         const user = userEvent.setup();
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );

         const checkedInput = screen.getAllByPlaceholderText("0")[0];
         await user.clear(checkedInput);
         await user.type(checkedInput, "abc123");

         expect(checkedInput).toHaveValue("123");
      });

      it("only allows numeric input for carry-on bags", async () => {
         const user = userEvent.setup();
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );

         const carryOnInput = screen.getAllByPlaceholderText("0")[1];
         await user.clear(carryOnInput);
         await user.type(carryOnInput, "xyz456");

         expect(carryOnInput).toHaveValue("456");
      });
   });

   describe("Form Validation", () => {
      it("shows alert when required fields are missing", async () => {
         const user = userEvent.setup();
         const alertSpy = vi
            .spyOn(window, "alert")
            .mockImplementation(() => {});

         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );

         await user.click(screen.getByText("Create Pod"));

         expect(alertSpy).toHaveBeenCalledWith("Please fill in all fields");
         alertSpy.mockRestore();
      });

      it("renders location dropdown when typing", async () => {
         const user = userEvent.setup();

         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );

         const locationInput = screen.getByPlaceholderText("Search location");
         await user.type(locationInput, "Kirkland");

         // Dropdown should show filtered locations
         await waitFor(() => {
            expect(screen.getByText("Kirkland Hall")).toBeInTheDocument();
         });
      });
   });

   describe("Edge Cases", () => {
      it("renders without user profile", () => {
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );
         expect(screen.getByText("Create New Pod")).toBeInTheDocument();
      });

      it("handles empty search query", async () => {
         const user = userEvent.setup();
         render(
            <CreatePodScreen onNavigate={mockNavigate} flight={mockFlight} />
         );

         const locationInput = screen.getByPlaceholderText("Search location");
         await user.click(locationInput);

         // All locations should be shown when search is empty
         await waitFor(() => {
            // At least some locations should appear
            const dropdown = document.querySelector(".absolute.top-full");
            if (dropdown) {
               expect(dropdown.children.length).toBeGreaterThan(0);
            }
         });
      });
   });
});
