// Contributors: Michelle

// TODO: Add shortcut for imports.
const { findMatchingPods } = require("../src/utils/matchingAlgorithm");

// Mock data and utility functions can be added here if needed
describe("findMatchingPods", () => {
  // Base user specification for tests
  const baseUserSpec = {
    earliestArrivalTime: "2025-10-18T12:00:00Z",
    latestArrivalTime: "2025-10-18T14:00:00Z",
    pickupLocation: {
      coordinates: [-122.4194, 37.7749],
    },
  };

  test("Returns pods that match both time and distance", () => {
    const pods = [
      {
        pickup_time: "2025-10-18T13:00:00Z",
        location: { coordinates: [-122.42, 37.775] },
      },
      {
        pickup_time: "2025-10-18T16:00:00Z",
        location: { coordinates: [-122.42, 37.775] },
      },
    ];

    const matches = findMatchingPods(baseUserSpec, pods);
    expect(matches.length).toBe(1);
    expect(matches[0].pickup_time).toBe("2025-10-18T13:00:00Z");
  });

  //
  test("Filters out pods too far away", () => {
    const pods = [
      {
        pickup_time: "2025-10-18T13:00:00Z",
        location: { coordinates: [-118.2437, 34.0522] },
      },
    ];

    const matches = findMatchingPods(baseUserSpec, pods);
    expect(matches.length).toBe(0);
  });

  test("Throws error on invalid user spec", () => {
    const badUserSpec = { pickupLocation: { coordinates: [] } };
    expect(() => findMatchingPods(badUserSpec, [])).toThrow(
      "Invalid user specification"
    );
  });
});
