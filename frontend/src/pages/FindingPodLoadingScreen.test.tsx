// Contributors: Vince
// Time: 0.5 hours

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingScreen } from "./LoadingScreen";

describe("LoadingScreen", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      vi.useFakeTimers();
   });

   afterEach(() => {
      vi.useRealTimers();
   });

   describe("Initial Rendering", () => {
      it("renders default loading text", () => {
         render(<LoadingScreen />);
         expect(screen.getByText("Loading...")).toBeInTheDocument();
      });

      it("renders custom text when provided", () => {
         render(<LoadingScreen text="Searching for rides..." />);
         expect(screen.getByText("Searching for rides...")).toBeInTheDocument();
      });

      it("renders spinner element", () => {
         render(<LoadingScreen />);
         const spinner = document.querySelector(".spinner");
         expect(spinner).toBeInTheDocument();
      });

      it("renders loading container", () => {
         render(<LoadingScreen />);
         const container = document.querySelector(".loading-container");
         expect(container).toBeInTheDocument();
      });
   });

   describe("Auto-Complete", () => {
      it("calls onComplete after default duration", () => {
         const mockComplete = vi.fn();
         render(<LoadingScreen onComplete={mockComplete} />);

         // Initially should not have called
         expect(mockComplete).not.toHaveBeenCalled();

         // Fast-forward time by default 1 second
         vi.advanceTimersByTime(1000);

         // Should have called onComplete
         expect(mockComplete).toHaveBeenCalled();
      });

      it("calls onComplete after custom duration", () => {
         const mockComplete = vi.fn();
         render(<LoadingScreen duration={3000} onComplete={mockComplete} />);

         // Fast-forward time by 2 seconds (not enough)
         vi.advanceTimersByTime(2000);
         expect(mockComplete).not.toHaveBeenCalled();

         // Fast-forward remaining time
         vi.advanceTimersByTime(1000);
         expect(mockComplete).toHaveBeenCalled();
      });

      it("does not crash when onComplete is not provided", () => {
         render(<LoadingScreen />);

         // Fast-forward time
         vi.advanceTimersByTime(1000);

         // Should not crash
         expect(screen.getByText("Loading...")).toBeInTheDocument();
      });
   });

   describe("Cleanup", () => {
      it("clears timeout on unmount", () => {
         const mockComplete = vi.fn();
         const { unmount } = render(
            <LoadingScreen onComplete={mockComplete} />
         );

         // Unmount before timer completes
         unmount();

         // Fast-forward time
         vi.advanceTimersByTime(1000);

         // Should not have called after unmount
         expect(mockComplete).not.toHaveBeenCalled();
      });
   });

   describe("Props Variations", () => {
      it("handles all props together", () => {
         const mockComplete = vi.fn();
         render(
            <LoadingScreen
               text="Custom loading..."
               duration={2000}
               onComplete={mockComplete}
            />
         );

         expect(screen.getByText("Custom loading...")).toBeInTheDocument();

         vi.advanceTimersByTime(2000);
         expect(mockComplete).toHaveBeenCalled();
      });
   });
});
