// Contributors: Michelle

import type { Pod } from "../src/types/pod_types.ts";

interface FilterParams {
  flightDate: string;
  earliestTime: string;
  latestTime: string;
  pickupLocation: string;
  numCarryOn: number;
  numChecked: number;
  genderPreference: string | null;
}

/**
 * Converts time string like "2:30 PM" to "14:30"
 */
function convertToMilitaryTime(timeStr: string): string {
  // Use a fixed date to correctly parse time without date conflicts
  const d = new Date(`2000/01/01 ${timeStr}`);
  if (isNaN(d.getTime())) {
    return "00:00";
  }

  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

/**
 * Creates a filter function to check if a Pod matches all user's search criteria.
 * (This internal function is kept to keep the filtering logic clean.)
 * @param filterParams Object containing all necessary user search and flight preferences.
 * @returns A function that takes a Pod and returns true if it matches the criteria.
 */
const createInternalPodFilter = ({
  flightDate,
  earliestTime,
  latestTime,
  pickupLocation,
  numCarryOn,
  numChecked,
  genderPreference,
}: FilterParams) => {
  // Use YYYY-MM-DD format for consistent comparison
  const searchDateOnly = new Date(flightDate).toISOString().split("T")[0];

  // Safely convert and extract hours/minutes for time comparison
  const militaryEarliest = convertToMilitaryTime(earliestTime);
  const militaryLatest = convertToMilitaryTime(latestTime);

  const [earliestHour, earliestMin] = militaryEarliest.split(":").map(Number);
  const [latestHour, latestMin] = militaryLatest.split(":").map(Number);

  return (pod: Pod): boolean => {
    console.log("🔍 Filtering pod:", pod._id, "pickup_time:", pod.pickup_time);

    // 1. Date Match Check
    const podDateOnly = new Date(pod.pickup_time).toISOString().split("T")[0];
    console.log("  Date check - pod:", podDateOnly, "search:", searchDateOnly);
    if (podDateOnly !== searchDateOnly) {
      console.log("  ❌ Failed date check");
      return false;
    }

    // 2. Time Window Check (Corrected logic from previous turn)
    const podTime = new Date(pod.pickup_time);
    const earliest = new Date(podTime);
    earliest.setHours(earliestHour, earliestMin, 0, 0);

    const latest = new Date(podTime);
    latest.setHours(latestHour, latestMin, 0, 0);

    if (latest <= earliest) {
      latest.setDate(latest.getDate() + 1);
    }

    console.log("  Time check - pod:", podTime.toISOString(), "earliest:", earliest.toISOString(), "latest:", latest.toISOString());
    if (!(podTime >= earliest && podTime <= latest)) {
      console.log("  ❌ Failed time window check");
      return false;
    }

    // 3. Pickup Location Check
    const withinLocation =
      !pickupLocation ||
      pod.pickup_location?.name
        .toLowerCase()
        .includes(pickupLocation.toLowerCase());

    console.log("  Location check - pod:", pod.pickup_location?.name, "search:", pickupLocation, "match:", withinLocation);
    if (!withinLocation) {
      console.log("  ❌ Failed location check");
      return false;
    }

    // 4. Luggage Capacity Check
    const totalUserLuggage = Number(numCarryOn) + Number(numChecked);
    console.log("  Luggage check - user total:", totalUserLuggage, "(not currently used in filter)");

    // 5. Gender Preference Check
    const genderMatches =
      !genderPreference ||
      pod.members.every((member) => member.gender === genderPreference);

    console.log("  Gender check - preference:", genderPreference, "match:", genderMatches);
    if (!genderMatches) {
      console.log("  ❌ Failed gender check");
      return false;
    }

    console.log("  ✅ Pod passed all filters!");
    return true;
  };
};

/**
 * Main helper function: Fetches a list of pods and filters them based on criteria.
 * @param allPods The raw list of all pods from the API.
 * @param filterParams Object containing all necessary user search and flight preferences.
 * @returns A filtered array of Pod objects.
 */
export const filterPods = (
  allPods: Pod[],
  filterParams: FilterParams
): Pod[] => {
  const filter = createInternalPodFilter(filterParams);
  return allPods.filter(filter);
};

// NOTE: Exporting 'createPodFilter' is no longer strictly necessary but can be kept
// if other modules still use it. For a clean refactor, you'd remove this old export.
export const createPodFilter = createInternalPodFilter;
