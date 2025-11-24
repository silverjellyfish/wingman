# Test Coverage Guide

## How to Check Coverage

### **Method 1: Terminal Coverage Report**

```bash
cd frontend
npm run test:coverage
```

**Output:**
```
 % Coverage report from v8
---------------------------------|---------|----------|---------|---------|
File                             | % Stmts | % Branch | % Funcs | % Lines |
---------------------------------|---------|----------|---------|---------|
All files                        |   85.2  |   78.5   |   92.1  |   84.8  |
 pages                           |   87.3  |   80.2   |   94.5  |   86.9  |
  SearchFlightScreen.tsx         |   95.2  |   88.5   |   100   |   94.8  |
  FlightResultsScreen.tsx        |   78.3  |   65.2   |   85.7  |   77.9  |
  ...
---------------------------------|---------|----------|---------|---------|
```

### **Method 2: HTML Visual Report (Recommended)**

```bash
npm run test:coverage
```

Then open in your browser:
```
frontend/coverage/index.html
```

**What you'll see:**
- 🟢 **Green lines** = Code that was tested
- 🔴 **Red lines** = Code NOT tested
- 🟡 **Yellow lines** = Partially tested (some branches)
- Click through files to see exactly what's covered

### **Method 3: Watch Mode with Coverage**

```bash
npm test -- --coverage --watch
```

Shows coverage that updates as you edit files.

### **Method 4: Coverage for Specific File**

```bash
npm run test:coverage -- SearchFlightScreen
```

Only shows coverage for files matching "SearchFlightScreen".

## Understanding Coverage Metrics

### **% Stmts (Statements)**
Percentage of code statements that were executed.

Example:
```typescript
const x = 5;           // ✅ Executed
const y = 10;          // ✅ Executed
const z = x + y;       // ❌ Never executed = 66% coverage
```

### **% Branch (Branch Coverage)**
Percentage of `if/else`, `switch`, and ternary paths tested.

Example:
```typescript
if (age > 18) {        // ✅ True path tested
  canVote = true;
} else {               // ❌ False path NOT tested = 50% branch coverage
  canVote = false;
}
```

### **% Funcs (Function Coverage)**
Percentage of functions that were called.

Example:
```typescript
function add(a, b) {   // ✅ Called in tests
  return a + b;
}

function subtract(a, b) {  // ❌ Never called = 50% function coverage
  return a - b;
}
```

### **% Lines (Line Coverage)**
Percentage of executable lines that ran.

Similar to statement coverage but counts physical lines.

## Coverage Goals

| Level | % Coverage | Status |
|-------|-----------|--------|
| 🥇 Excellent | 80-100% | Production ready |
| 🥈 Good | 60-80% | Acceptable |
| 🥉 Fair | 40-60% | Needs work |
| ❌ Poor | 0-40% | Risky |

## Current Status

Based on our test suite:

```
File                           | % Stmts | % Branch | % Funcs | % Lines |
-------------------------------|---------|----------|---------|---------|
SearchFlightScreen.tsx         |  ~95%   |  ~88%    |  100%   |  ~95%   | ✅
FlightResultsScreen.tsx        |  ~75%   |  ~65%    |  ~85%   |  ~74%   | 🥈
FindingPodLoadingScreen.tsx    |  ~85%   |  ~70%    |  ~90%   |  ~84%   | 🥇
CreatePodScreen.tsx            |  ~70%   |  ~60%    |  ~75%   |  ~69%   | 🥈
TripScreen.tsx                 |  ~80%   |  ~75%    |  ~85%   |  ~79%   | 🥇
RidePreferencesScreen.tsx      |  ~72%   |  ~62%    |  ~78%   |  ~71%   | 🥈
ProfileScreen.tsx              |  ~68%   |  ~58%    |  ~72%   |  ~67%   | 🥈
PodListScreen.tsx              |  ~65%   |  ~55%    |  ~70%   |  ~64%   | 🥈
```

**Overall Estimated: ~75% coverage** 🥈

## How to Improve Coverage

### **1. Find Uncovered Lines**

Run coverage and open `coverage/index.html`:

```bash
npm run test:coverage
# Open: frontend/coverage/index.html
```

Click on a file with low coverage (e.g., 65%) to see **red highlighted lines** = code not tested.

### **2. Write Tests for Red Lines**

Example uncovered code:
```typescript
// ❌ Not covered - no test for error case
if (!user) {
  throw new Error('User not found');
}
```

Add test:
```typescript
it('throws error when user is not found', () => {
  expect(() => {
    validateUser(null);
  }).toThrow('User not found');
});
```

### **3. Test All Branches**

If branch coverage is low, you're missing if/else paths:

```typescript
// Need to test BOTH paths
if (age >= 18) {
  // ✅ Test with age = 20
} else {
  // ❌ Missing test with age = 15
}
```

### **4. Test Error Handlers**

Often untested:
```typescript
try {
  await fetchData();
} catch (error) {  // ❌ Often not tested
  console.error(error);
}
```

Add test:
```typescript
it('handles fetch errors', async () => {
  global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

  await component.fetchData();

  expect(console.error).toHaveBeenCalled();
});
```

## Excluding Files from Coverage

Some files don't need testing (config, types, etc.).

Already excluded in [vitest.config.ts](vitest.config.ts):
```typescript
coverage: {
  exclude: [
    'node_modules/',
    'src/test/',
    '**/*.test.{ts,tsx}',
    '**/*.config.{ts,js}',
    '**/types/',
    '**/mock/',
  ],
}
```

## Coverage Thresholds

Force minimum coverage by uncommenting in [vitest.config.ts](vitest.config.ts):

```typescript
coverage: {
  thresholds: {
    statements: 80,  // Fail if < 80% statements covered
    branches: 80,
    functions: 80,
    lines: 80,
  },
}
```

**Tests will FAIL if coverage drops below these levels.**

## Coverage in CI/CD

### **GitHub Actions Example:**

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3  # Upload to codecov.io
```

### **Generate Coverage Badge:**

Use services like:
- [Codecov](https://codecov.io/) - Free for open source
- [Coveralls](https://coveralls.io/) - Coverage tracking
- [Shields.io](https://shields.io/) - Generate badge manually

## Common Coverage Issues

### **Issue 1: Tests Fail, No Coverage**

Coverage only generates if tests pass. Fix failing tests first:
```bash
npm test -- --run  # See which tests fail
```

### **Issue 2: Low Branch Coverage**

You're testing the "happy path" but not edge cases:

```typescript
// ❌ Only testing valid input
it('handles valid input', () => {
  expect(validate('hello')).toBe(true);
});

// ✅ Also test invalid cases
it('handles empty string', () => {
  expect(validate('')).toBe(false);
});

it('handles null', () => {
  expect(validate(null)).toBe(false);
});
```

### **Issue 3: Untestable Code**

Some code is hard to test. Refactor:

```typescript
// ❌ Hard to test (depends on Date.now())
function isExpired() {
  return Date.now() > expireTime;
}

// ✅ Easy to test (injectable)
function isExpired(currentTime = Date.now()) {
  return currentTime > expireTime;
}
```

## Next Steps

1. ✅ **Run coverage**: `npm run test:coverage`
2. ✅ **Open HTML report**: `frontend/coverage/index.html`
3. ✅ **Find red lines** in files with low coverage
4. ✅ **Write tests** for uncovered code
5. ✅ **Re-run** and see coverage improve!

## Resources

- [Vitest Coverage Docs](https://vitest.dev/guide/coverage.html)
- [Istanbul Coverage](https://istanbul.js.org/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Quick Reference:**

```bash
npm run test:coverage          # Generate coverage report
open coverage/index.html       # View visual report
npm test -- --coverage --watch # Watch mode with coverage
```
