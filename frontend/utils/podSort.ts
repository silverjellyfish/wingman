import type { Pod } from "../src/types/pod_types.ts";

export function sortPods(
  pods: Pod[],
  {
    earliestTime,
    latestTime,
    flightBoardingTime,
  }: {
    earliestTime: string;
    latestTime: string;
    flightBoardingTime: string;
  }
): Pod[] {
  const toMinutes = (t: string) => {
    const d = new Date(`2000/01/01 ${t}`);
    return d.getHours() * 60 + d.getMinutes();
  };

  const earliest = toMinutes(earliestTime);
  const latest = toMinutes(latestTime);
  const boarding = toMinutes(flightBoardingTime);
  const TOO_CLOSE_THRESHOLD = 90;

  const inWindow = (pickupMin: number) => {
    if (latest >= earliest) return pickupMin >= earliest && pickupMin <= latest;

    return pickupMin >= earliest || pickupMin <= latest;
  };

  return pods.sort((a, b) => {
    const aPickup = toMinutes(
      new Date(a.pickup_time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    const bPickup = toMinutes(
      new Date(b.pickup_time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    // 1 — Time score
    const scoreTime = (pickupMin: number) => {
      let score = 0;

      if (inWindow(pickupMin)) score += 2;

      if (boarding - pickupMin <= TOO_CLOSE_THRESHOLD) score -= 3;

      return score;
    };

    const aTime = scoreTime(aPickup);
    const bTime = scoreTime(bPickup);
    if (aTime !== bTime) return bTime - aTime;

    // 2 — Luggage score (lower is better)
    const sumLuggage = (pod: Pod) =>
      pod.members.reduce(
        (acc, m) => acc + (m.numCarryOnBags || 0) + (m.numCheckedInBags || 0),
        0
      );

    const aLug = sumLuggage(a);
    const bLug = sumLuggage(b);
    if (aLug !== bLug) return aLug - bLug;

    // 3 — Remaining capacity (higher better)
    const aCap = a.max_people - a.num_members;
    const bCap = b.max_people - b.num_members;
    if (aCap !== bCap) return bCap - aCap;

    return 0;
  });
}
