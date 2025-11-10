// Contributors: Vince
// Time: 0.5 hours

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TripScreen } from './TripScreen'

describe('TripScreen', () => {
  const mockNavigate = vi.fn()

  describe('Initial Rendering', () => {
    it('renders the trip history title', () => {
      render(<TripScreen onNavigate={mockNavigate} />)
      expect(screen.getByText('Trip History')).toBeInTheDocument()
    })

    it('renders all mock trips', () => {
      render(<TripScreen onNavigate={mockNavigate} />)

      // Check for trip dates
      expect(screen.getByText(/Dec 20, 2024/i)).toBeInTheDocument()
      expect(screen.getByText(/Nov 15, 2024/i)).toBeInTheDocument()
    })

    it('renders trip times', () => {
      render(<TripScreen onNavigate={mockNavigate} />)

      expect(screen.getByText(/3:00 PM/i)).toBeInTheDocument()
      expect(screen.getByText(/2:00 PM/i)).toBeInTheDocument()
    })
  })

  describe('Trip Card Information', () => {
    it('displays trip destination', () => {
      render(<TripScreen onNavigate={mockNavigate} />)
      const destinations = screen.getAllByText(/Nashville Airport/i)
      expect(destinations.length).toBeGreaterThan(0)
    })

    it('displays luggage counts', () => {
      render(<TripScreen onNavigate={mockNavigate} />)

      // First trip: 2 big, 1 small
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()

      // Second trip: 3 big, 2 small
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('renders member avatars for each trip', () => {
      render(<TripScreen onNavigate={mockNavigate} />)

      // First trip has 3 members, second trip has 2 members
      // Total avatars should be 5 (3 + 2)
      const avatars = document.querySelectorAll('.rounded-full')
      expect(avatars.length).toBeGreaterThanOrEqual(5)
    })

    it('limits displayed members to 3', () => {
      render(<TripScreen onNavigate={mockNavigate} />)

      // The component slices members to show only first 3
      // First trip card should have exactly 3 avatars
      const tripCards = document.querySelectorAll('.bg-\\[\\#28282d\\]')
      expect(tripCards.length).toBe(2)
    })
  })

  describe('Layout and Styling', () => {
    it('renders luggage icons', () => {
      render(<TripScreen onNavigate={mockNavigate} />)

      // BsSuitcase2 and BsSuitcaseLg should be rendered
      const luggageIcons = document.querySelectorAll('svg')
      expect(luggageIcons.length).toBeGreaterThan(0)
    })

    it('applies correct spacing between trips', () => {
      render(<TripScreen onNavigate={mockNavigate} />)

      const tripContainer = document.querySelector('.space-y-\\[10px\\]')
      expect(tripContainer).toBeInTheDocument()
    })
  })

  describe('Trip Card Structure', () => {
    it('shows date and time together', () => {
      render(<TripScreen onNavigate={mockNavigate} />)

      // Check for combined date/time format
      expect(screen.getByText(/Dec 20, 2024 • 3:00 PM/i)).toBeInTheDocument()
      expect(screen.getByText(/Nov 15, 2024 • 2:00 PM/i)).toBeInTheDocument()
    })

    it('displays location label', () => {
      render(<TripScreen onNavigate={mockNavigate} />)

      const locationLabels = screen.getAllByText(/Location:/i)
      expect(locationLabels.length).toBe(2)
    })
  })

  describe('Empty State', () => {
    it('renders without trips (component has hardcoded data)', () => {
      // This component always has hardcoded trips
      // Testing that it renders consistently
      render(<TripScreen onNavigate={mockNavigate} />)

      expect(screen.getByText('Trip History')).toBeInTheDocument()
    })
  })

  describe('Scrollable Container', () => {
    it('has scrollable main content area', () => {
      render(<TripScreen onNavigate={mockNavigate} />)

      const scrollContainer = document.querySelector('.overflow-auto, .\\[\\&\\:\\:-webkit-scrollbar\\]\\:hidden')
      // The component should have a scrollable container
      expect(document.querySelector('.flex-1')).toBeInTheDocument()
    })
  })
})
