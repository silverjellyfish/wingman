// Contributors: Michelle
// Time: 1.5 hours

const MAX_DISTANCE_MILES = 2;

function calculateDistanceInMiles(loc1, loc2) {
    const toRad = (value) => (value * Math.PI) / 180;
    const EARTH_RADIUS_MILES = 3958.8;

    // depending on what loc1 and loc2 are, might need to change
    const latDiff = toRad(loc2.latitude - loc1.latitude);
    const lonDiff = toRad(loc2.longitude - loc1.longitude);

    const lat1Rad = toRad(loc1.latitude);
    const lat2Rad = toRad(loc2.latitude);

    const a = Math.sin(latDiff / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));

    return EARTH_RADIUS_MILES * c;
}

// Matches based on time buffer, distance, and gender preference
function findMatchingPods(userSpec, pods) {
    const { earliestArrivalTime, latestArrivalTime, pickupLocation, genderPreference } = userSpec;
    if (!pickupLocation || !latestArrivalTime || !earliestArrivalTime || pickupLocation.coordinates.length !== 2) {
        throw new Error("Invalid user specification");
    }

    const userCoords = pickupLocation.coordinates;

    const matchingPods = pods.filter(pod => {
        const podTime = new Date(pod.pickup_time).getTime();
        const earliest = new Date(earliestArrivalTime).getTime();
        const latest = new Date(latestArrivalTime).getTime();

        const timeMatches = podTime >= earliest && podTime <= latest;

        const podCoords = [pod.location.coordinates[1], pod.location.coordinates[0]];
        const userCoordsLatLon = [userCoords[1], userCoords[0]];
        const distanceMiles = calculateDistanceInMiles({ latitude: podCoords[0], longitude: podCoords[1] }, { latitude: userCoordsLatLon[0], longitude: userCoordsLatLon[1]});
        const locationMatches = distanceMiles <= MAX_DISTANCE_MILES;

        // Gender matching: if genderPreference is set, all pod members must match that gender
        const genderMatches = !genderPreference ||
            (pod.members && pod.members.every(member =>
                member.user && member.user.gender === genderPreference
            ));

        return timeMatches && locationMatches && genderMatches;
    });
    return matchingPods;
}

module.exports = { findMatchingPods };
