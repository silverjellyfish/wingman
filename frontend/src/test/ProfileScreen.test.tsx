// Contributors: Vince
// Time: 1.5 hours

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProfileScreen } from "../pages/ProfileScreen";

// Mock AuthContext
const mockLogout = vi.fn();
const mockDeleteAccount = vi.fn();

vi.mock("@/contexts/AuthContext", () => ({
   useAuth: () => ({
      user: { id: "user123", name: "John Doe" },
      logout: mockLogout,
      deleteAccount: mockDeleteAccount,
   }),
}));

// Mock fetch
global.fetch = vi.fn();

describe("ProfileScreen", () => {
   const mockNavigate = vi.fn();

   beforeEach(() => {
      vi.clearAllMocks();
      (global.fetch as any).mockReset();
      (global.fetch as any).mockResolvedValue({
         ok: true,
         json: async () => ({
            _id: "user123",
            name: "John Doe",
            username: "johndoe",
            email: "john@example.com",
            phone: "615-555-1234",
            age: 25,
            gender: "male",
         }),
      });
   });

   describe("Initial Rendering", () => {
      it("renders user profile information", async () => {
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => {
            expect(screen.getByText("John Doe")).toBeInTheDocument();
         });
      });

      it("renders username with @ symbol", async () => {
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => {
            expect(screen.getByText("@johndoe")).toBeInTheDocument();
         });
      });

      it("renders email field", async () => {
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => {
            expect(screen.getByText("Email")).toBeInTheDocument();
            expect(
               screen.getByDisplayValue("john@example.com")
            ).toBeInTheDocument();
         });
      });

      it("renders phone number field", async () => {
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => {
            expect(screen.getByText("Phone Number")).toBeInTheDocument();
         });
      });

      it("renders age and gender fields", async () => {
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => {
            expect(screen.getByText("Age")).toBeInTheDocument();
            expect(screen.getByText("Gender")).toBeInTheDocument();
         });
      });

      it("renders logout button", () => {
         render(<ProfileScreen onNavigate={mockNavigate} />);
         expect(screen.getByText("Logout")).toBeInTheDocument();
      });

      it("renders delete account button", () => {
         render(<ProfileScreen onNavigate={mockNavigate} />);
         expect(screen.getByText("Delete Account")).toBeInTheDocument();
      });

      it("renders edit button", () => {
         render(<ProfileScreen onNavigate={mockNavigate} />);
         const editButton = screen.getByText("edit");
         expect(editButton).toBeInTheDocument();
      });
   });

   describe("Edit Mode", () => {
      it("toggles edit mode when edit button is clicked", async () => {
         const user = userEvent.setup();
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => {
            expect(screen.getByText("edit")).toBeInTheDocument();
         });

         await user.click(screen.getByText("edit"));

         expect(screen.getByText("check")).toBeInTheDocument();
      });

      it("enables inputs in edit mode", async () => {
         const user = userEvent.setup();
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => {
            const phoneInput = screen.getByDisplayValue(/615/);
            expect(phoneInput).toBeDisabled();
         });

         await user.click(screen.getByText("edit"));

         await waitFor(() => {
            const phoneInput = screen.getByDisplayValue(/615/);
            expect(phoneInput).not.toBeDisabled();
         });
      });

      it("keeps email disabled even in edit mode", async () => {
         const user = userEvent.setup();
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => {
            const emailInput = screen.getByDisplayValue("john@example.com");
            expect(emailInput).toBeDisabled();
         });

         await user.click(screen.getByText("edit"));

         const emailInput = screen.getByDisplayValue("john@example.com");
         expect(emailInput).toBeDisabled();
      });
   });

   describe("Phone Number Input", () => {
      it("formats phone number correctly", async () => {
         const user = userEvent.setup();
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => screen.getByText("edit"));
         await user.click(screen.getByText("edit"));

         const phoneInput =
            screen.getByLabelText("Phone Number", { exact: false }) ||
            document.querySelector('input[type="tel"]');

         if (phoneInput) {
            fireEvent.change(phoneInput, { target: { value: "6155551234" } });

            await waitFor(() => {
               expect(phoneInput).toHaveValue("615-555-1234");
            });
         }
      });

      it("formats phone number with 3-6 digits (partial)", async () => {
         const user = userEvent.setup();
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => screen.getByText("edit"));
         await user.click(screen.getByText("edit"));

         const phoneInput = document.querySelector('input[type="tel"]');

         if (phoneInput) {
            fireEvent.change(phoneInput, { target: { value: "615555" } });

            await waitFor(() => {
               expect(phoneInput).toHaveValue("615-555");
            });
         }
      });

      it("formats phone number with less than 3 digits", async () => {
         const user = userEvent.setup();
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => screen.getByText("edit"));
         await user.click(screen.getByText("edit"));

         const phoneInput = document.querySelector('input[type="tel"]');

         if (phoneInput) {
            fireEvent.change(phoneInput, { target: { value: "61" } });

            await waitFor(() => {
               expect(phoneInput).toHaveValue("61");
            });
         }
      });

      it("limits phone number to 10 digits", async () => {
         const user = userEvent.setup();
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => screen.getByText("edit"));
         await user.click(screen.getByText("edit"));

         const phoneInput = document.querySelector('input[type="tel"]');

         if (phoneInput) {
            fireEvent.change(phoneInput, { target: { value: "12345678901" } });

            // Should only keep first 10 digits
            expect(
               phoneInput.getAttribute("value")?.replace(/-/g, "").length
            ).toBeLessThanOrEqual(10);
         }
      });
   });

   describe("Age Input", () => {
      it("only allows numeric input", async () => {
         const user = userEvent.setup();
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => screen.getByText("edit"));
         await user.click(screen.getByText("edit"));

         const ageInput = screen.getByDisplayValue("25");
         fireEvent.change(ageInput, { target: { value: "abc30" } });

         await waitFor(() => {
            expect(ageInput).toHaveValue("30");
         });
      });

      it("allows empty age input", async () => {
         const user = userEvent.setup();
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => screen.getByText("edit"));
         await user.click(screen.getByText("edit"));

         const ageInput = screen.getByDisplayValue("25");
         fireEvent.change(ageInput, { target: { value: "" } });

         await waitFor(() => {
            expect(ageInput).toHaveValue("");
         });
      });

      it("limits age to 0-99", async () => {
         const user = userEvent.setup();
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => screen.getByText("edit"));
         await user.click(screen.getByText("edit"));

         const ageInput = screen.getByDisplayValue("25");
         fireEvent.change(ageInput, { target: { value: "150" } });

         // Should not accept values over 99
         await waitFor(() => {
            const value = parseInt(ageInput.getAttribute("value") || "0");
            expect(value).toBeLessThanOrEqual(99);
         });
      });
   });

   describe("Gender Selection", () => {
      it("shows dropdown in edit mode", async () => {
         const user = userEvent.setup();
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => screen.getByText("edit"));
         await user.click(screen.getByText("edit"));

         await waitFor(() => {
            const genderSelect = screen.getByDisplayValue("male");
            expect(genderSelect.tagName).toBe("SELECT");
         });
      });

      it("shows input in view mode", async () => {
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => {
            const genderInput = screen.getByDisplayValue("male");
            expect(genderInput.tagName).toBe("INPUT");
            expect(genderInput).toBeDisabled();
         });
      });
   });

   describe("Logout", () => {
      it("calls logout when logout button is clicked", async () => {
         const user = userEvent.setup();
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await user.click(screen.getByText("Logout"));

         expect(mockLogout).toHaveBeenCalled();
         expect(mockNavigate).toHaveBeenCalledWith("ride");
      });
   });

   describe("Delete Account", () => {
      it("shows confirmation dialog when delete account is clicked", async () => {
         const user = userEvent.setup();
         const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);

         render(<ProfileScreen onNavigate={mockNavigate} />);

         await user.click(screen.getByText("Delete Account"));

         expect(confirmSpy).toHaveBeenCalledWith(
            "Are you sure you want to delete your account? This action cannot be undone."
         );

         confirmSpy.mockRestore();
      });

      it("does not delete account if user cancels", async () => {
         const user = userEvent.setup();
         const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);

         render(<ProfileScreen onNavigate={mockNavigate} />);

         await user.click(screen.getByText("Delete Account"));

         expect(mockDeleteAccount).not.toHaveBeenCalled();

         confirmSpy.mockRestore();
      });

      it("deletes account if user confirms", async () => {
         const user = userEvent.setup();
         const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
         mockDeleteAccount.mockResolvedValue(undefined);

         render(<ProfileScreen onNavigate={mockNavigate} />);

         await user.click(screen.getByText("Delete Account"));

         await waitFor(() => {
            expect(mockDeleteAccount).toHaveBeenCalledWith("user123");
         });

         confirmSpy.mockRestore();
      });
   });

   describe("Profile Fetching", () => {
      it("fetches user profile on mount", async () => {
         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
         });
      });

      it("handles fetch errors gracefully", async () => {
         const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});
         (global.fetch as any).mockRejectedValueOnce(
            new Error("Network error")
         );

         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalled();
         });

         consoleErrorSpy.mockRestore();
      });
   });

   describe("Edge Cases", () => {
      it("renders without user data", () => {
         render(<ProfileScreen onNavigate={mockNavigate} />);
         // Should not crash
         expect(screen.getByText("Email")).toBeInTheDocument();
      });

      it("handles empty phone number", async () => {
         (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
               name: "John Doe",
               username: "johndoe",
               email: "john@example.com",
               phone: "",
            }),
         });

         render(<ProfileScreen onNavigate={mockNavigate} />);

         await waitFor(() => {
            expect(screen.getByText("Phone Number")).toBeInTheDocument();
         });
      });
   });
});
