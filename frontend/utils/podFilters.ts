// utils/podFilters.ts
// UA 1331, dec 1, bna to ewr

import type { Pod } from "../src/types/pod_types.ts";

/**
 * Converts time string like "2:30 PM" to "14:30"
 * This helper is needed inside the filter logic.
 */
function convertToMilitaryTime(timeStr: string): string {
  // Create a Date object. The specific date doesn't matter,
  // we just need it to parse the time string.
  const d = new Date(`2025/10/28 ${timeStr}`);

  // Extract the hours and minutes in 24-hour format
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

const charToSplit = [":", " "];
const regex = new RegExp(`[${charToSplit.join("")}]`, "g");

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
 * Creates a filter function to check if a Pod matches all user's search criteria.
 * @param params Object containing all necessary user search and flight preferences.
 * @returns A function (pod: Pod) => boolean to be used with Array.prototype.filter.
 */
export const createPodFilter = ({
  flightDate,
  earliestTime,
  latestTime,
  pickupLocation,
  numCarryOn,
  numChecked,
  genderPreference,
}: FilterParams) => {
  const flightDateISO = new Date(flightDate).toISOString().split("T")[0];
  const flightArray = flightDateISO.split("-");

  const splitTimeEarliest = convertToMilitaryTime(earliestTime).split(regex);
  const splitTimeLatest = convertToMilitaryTime(latestTime).split(regex);

  const [earliestHour, earliestMin] = [
    Number(splitTimeEarliest[0]),
    Number(splitTimeEarliest[1]),
  ];
  const [latestHour, latestMin] = [
    Number(splitTimeLatest[0]),
    Number(splitTimeLatest[1]),
  ];

  return (pod: Pod): boolean => {
    // 1. Date Match Check
    const podDate = new Date(pod.pickup_time).toLocaleString().split(",")[0];
    const podArray = podDate.split("/");

    const sameDay =
      // Checks for month, day, and year match (adjust for locale-specific date format if necessary)
      podArray[0] == flightArray[1] &&
      podArray[2] == flightArray[0] &&
      podArray[1] == flightArray[2];
    
    if (!sameDay) return false;

    // 2. Time Window Check
    const podTime = new Date(pod.pickup_time);
    
    const earliest = new Date(podTime);
    earliest.setHours(earliestHour, earliestMin, 0, 0);
    
    const latest = new Date(podTime);
    latest.setHours(latestHour, latestMin, 0, 0);
    
    const withinTime = podTime >= earliest && podTime <= latest;

    if (!withinTime) return false;

    // 3. Pickup Location Check
    const withinLocation =
      !pickupLocation ||
      pod.location?.name
        ?.toLowerCase()
        .includes(pickupLocation.toLowerCase());
    
    if (!withinLocation) return false;

    // 4. Luggage Capacity Check
    const totalUserLuggage = Number(numCarryOn) + Number(numChecked);
    const totalPodCapacity = pod.num_small_luggage + pod.num_big_luggage;
    const withinLuggage = totalUserLuggage <= totalPodCapacity;
    
    if (!withinLuggage) return false;

    // 5. Gender Preference Check
    const genderMatches =
      !genderPreference ||
      pod.members.every((member) => member.gender === genderPreference);
      
    if (!genderMatches) return false;

    // If all checks pass
    return true;
  };
};