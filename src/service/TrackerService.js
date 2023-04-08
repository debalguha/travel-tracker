export const TrackerService = {
    getTrackerMetaData() {
        return fetch('http://localhost:8080/campaigns', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json());
    }
}