import axios from 'axios';

export const TrackerService = {
    getTrackerMetaData() {
        return axios.get('http://localhost:8080/campaigns')
            .then((res) => res.data);
    },

    saveTrackerMeta(tracker, callBack) {
        return axios.post('http://localhost:8080/campaign', tracker)
            .then((response) => callBack(response.data))
    }
}