import axios from "axios";

class APIRequests {
    static async get (endpoint) {
        const {data} = await axios.get(endpoint.replace('http:', 'https:'))
        return data
    }
}
export default APIRequests;
