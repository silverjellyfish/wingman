// Contributors: Vince
// Time: 0.5 hours

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { LoadingScreen } from './FindingPodLoadingScreen'

describe('LoadingScreen', () => {
  const mockNavigate = vi.fn()
  const mockPayload = { flight: {}, preferences: {} }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Initial Rendering', () => {
    it('renders loading text', () => {
      render(<LoadingScreen onNavigate={mockNavigate} payload={mockPayload} />)
      expect(screen.getByText('Searching for rides...')).toBeInTheDocument()
    })

    it('renders progress bar', () => {
      render(<LoadingScreen onNavigate={mockNavigate} payload={mockPayload} />)
      const progressBar = document.querySelector('.progress-bar')
      expect(progressBar).toBeInTheDocument()
    })

    it('renders progress bar fill', () => {
      render(<LoadingScreen onNavigate={mockNavigate} payload={mockPayload} />)
      const progressBarFill = document.querySelector('.progress-bar-fill')
      expect(progressBarFill).toBeInTheDocument()
    })
  })

  describe('Auto-Navigation', () => {
    it('navigates to rideWithGroup after 3 seconds', async () => {
      render(<LoadingScreen onNavigate={mockNavigate} payload={mockPayload} />)

      // Initially should not have navigated
      expect(mockNavigate).not.toHaveBeenCalled()

      // Fast-forward time by 3 seconds
      vi.advanceTimersByTime(3000)

      // Should have navigated with correct params
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('rideWithGroup', undefined, undefined, mockPayload)
      })
    })

    it('does not navigate before 3 seconds', () => {
      render(<LoadingScreen onNavigate={mockNavigate} payload={mockPayload} />)

      // Fast-forward time by 2 seconds
      vi.advanceTimersByTime(2000)

      // Should not have navigated yet
      expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('passes payload to next screen', async () => {
      const customPayload = {
        flight: { code: 'WN123' },
        preferences: { location: 'BNA' },
      }

      render(<LoadingScreen onNavigate={mockNavigate} payload={customPayload} />)

      vi.advanceTimersByTime(3000)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('rideWithGroup', undefined, undefined, customPayload)
      })
    })
  })

  describe('Cleanup', () => {
    it('clears timeout on unmount', () => {
      const { unmount } = render(<LoadingScreen onNavigate={mockNavigate} payload={mockPayload} />)

      // Unmount before timer completes
      unmount()

      // Fast-forward time
      vi.advanceTimersByTime(3000)

      // Should not have navigated after unmount
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined payload', async () => {
      render(<LoadingScreen onNavigate={mockNavigate} payload={undefined} />)

      vi.advanceTimersByTime(3000)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalled()
      })
    })

    it('handles empty payload object', async () => {
      render(<LoadingScreen onNavigate={mockNavigate} payload={{}} />)

      vi.advanceTimersByTime(3000)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('rideWithGroup', undefined, undefined, {})
      })
    })
  })
})
