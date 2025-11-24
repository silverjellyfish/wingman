// utils/podFilters.ts
// Contributors: Samantha, Michelle

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
    // 1. Date Match Check
    const podDateOnly = new Date(pod.pickup_time).toISOString().split("T")[0];
    if (podDateOnly !== searchDateOnly) return false;

    // 2. Time Window Check (Corrected logic from previous turn)
    const podTime = new Date(pod.pickup_time);
    const earliest = new Date(podTime);
    earliest.setHours(earliestHour, earliestMin, 0, 0);

    const latest = new Date(podTime);
    latest.setHours(latestHour, latestMin, 0, 0);

    // Handle time windows that wrap around midnight (e.g., 10 PM to 2 AM)
    if (latest <= earliest) {
      latest.setDate(latest.getDate() + 1);
    }

    console.log(podTime >= earliest && podTime <= latest);
    if (!(podTime >= earliest && podTime <= latest)) return false;

    // 3. Pickup Location Check
    const withinLocation =
      !pickupLocation ||
      pod.pickup_location?.name
        .toLowerCase()
        .includes(pickupLocation.toLowerCase());

    if (!withinLocation) return false;

    // 4. Luggage Capacity Check
    const totalUserLuggage = Number(numCarryOn) + Number(numChecked);
    const totalPodCapacity = pod.num_big_luggage + pod.num_small_luggage;
    console.log("Capacity match:", totalUserLuggage <= totalPodCapacity);
    if (totalUserLuggage > totalPodCapacity) return false;

    // 5. Gender Preference Check
    const genderMatches =
      !genderPreference ||
      pod.members.every((member) => member.gender === genderPreference);

    console.log(genderMatches);
    if (!genderMatches) return false;

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
  console.log("Filtering pods with params:", filterParams);
  const filter = createInternalPodFilter(filterParams);
  return allPods.filter(filter);
};

// NOTE: Exporting 'createPodFilter' is no longer strictly necessary but can be kept
// if other modules still use it. For a clean refactor, you'd remove this old export.
export const createPodFilter = createInternalPodFilter;
