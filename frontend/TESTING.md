# Frontend Testing Guide

This project uses **Vitest** and **React Testing Library** for frontend component testing.

## Testing Stack

- **Vitest** - Fast unit test framework optimized for Vite
- **React Testing Library** - Test React components from the user's perspective
- **jsdom** - Simulates browser environment for tests
- **@testing-library/user-event** - Simulate realistic user interactions
- **@testing-library/jest-dom** - Custom matchers for DOM assertions

## Running Tests

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once (for CI/CD)
npm test -- --run

# Open interactive UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Test File Location

Test files should be placed next to the component they test with a `.test.tsx` extension:

```
src/
  pages/
    SearchFlightScreen.tsx
    SearchFlightScreen.test.tsx  ← Test file
```

## Example Test Structure

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { YourComponent } from './YourComponent'

describe('YourComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    render(<YourComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interaction', async () => {
    const user = userEvent.setup()
    render(<YourComponent />)

    await user.click(screen.getByRole('button'))

    expect(screen.getByText('Result')).toBeInTheDocument()
  })
})
```

## Testing Best Practices

### 1. Test User Behavior, Not Implementation

```typescript
// ✅ Good - tests what the user sees
expect(screen.getByText('Hello World')).toBeInTheDocument()

// ❌ Bad - tests implementation details
expect(component.state.message).toBe('Hello World')
```

### 2. Use Accessible Queries

Prefer queries that match how users interact with your app:

```typescript
// Priority order:
screen.getByRole('button', { name: 'Submit' })  // Best
screen.getByLabelText('Email')                   // Good for forms
screen.getByPlaceholderText('Enter email')       // OK
screen.getByTestId('submit-btn')                 // Last resort
```

### 3. Mock External Dependencies

```typescript
// Mock context providers
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: { name: 'John Doe' } })
}))

// Mock window methods
const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
// ... test code ...
alertSpy.mockRestore()
```

### 4. Use fireEvent vs userEvent

- **userEvent**: Simulates real user interactions (recommended)
- **fireEvent**: Direct DOM events (use when userEvent doesn't work)

```typescript
// Prefer userEvent for realistic interactions
const user = userEvent.setup()
await user.click(button)
await user.type(input, 'text')

// Use fireEvent for controlled inputs or when userEvent fails
fireEvent.change(input, { target: { value: 'value' } })
```

## SearchFlightScreen Tests

The [SearchFlightScreen.test.tsx](src/pages/SearchFlightScreen.test.tsx) demonstrates comprehensive testing:

### Test Coverage Includes:

1. **Initial Rendering**
   - Greeting displays correctly
   - Initial search input appears
   - User name is extracted properly

2. **User Flow**
   - Search input focus behavior
   - Plane code input and validation
   - Code splitting into airline/flight number
   - Date selection via calendar
   - Form submission

3. **Input Validation**
   - Plane code format validation
   - Airline code (2 chars max, uppercase)
   - Flight number (4 digits max, numeric only)
   - Required field validation

4. **State Management**
   - Clear functionality resets state
   - Navigation callback with correct params
   - Input transformations (uppercase)

5. **Accessibility**
   - Dialog opening/closing
   - Keyboard interactions
   - Screen reader compatibility

## Writing New Tests

When creating tests for a new component:

1. **Start with rendering tests** - Verify the component renders without errors
2. **Test user interactions** - Click, type, select, etc.
3. **Test validation** - Invalid inputs, error messages
4. **Test state changes** - Component updates correctly
5. **Test callbacks** - Props functions are called correctly

## Common Patterns

### Async Operations

```typescript
it('handles async data loading', async () => {
  render(<Component />)

  await waitFor(() => {
    expect(screen.getByText('Loaded Data')).toBeInTheDocument()
  })
})
```

### Testing Forms

```typescript
it('submits form with valid data', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()

  render(<Form onSubmit={onSubmit} />)

  await user.type(screen.getByLabelText('Email'), 'test@example.com')
  await user.click(screen.getByRole('button', { name: 'Submit' }))

  expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com' })
})
```

### Testing Conditional Rendering

```typescript
it('shows error message when validation fails', async () => {
  render(<Component />)

  expect(screen.queryByText('Error')).not.toBeInTheDocument()

  // Trigger error
  await user.click(screen.getByText('Submit'))

  expect(screen.getByText('Error')).toBeInTheDocument()
})
```

## Debugging Tests

### View Rendered Output

```typescript
import { screen } from '@testing-library/react'

// Print the entire DOM
screen.debug()

// Print a specific element
screen.debug(screen.getByRole('button'))
```

### Use Testing Playground

```typescript
import { screen } from '@testing-library/react'

// Opens interactive query builder in browser
screen.logTestingPlaygroundURL()
```

## Continuous Integration

Tests run automatically on:
- Pull requests
- Main branch commits
- Pre-commit hooks (if configured)

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
