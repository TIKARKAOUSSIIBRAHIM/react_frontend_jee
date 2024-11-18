import axios from "axios";

const axios_client = axios.create(
    {
        baseURL: 'http://localhost:8762',
        headers: {'Content-Type': 'application/json'},
    }
)
export default axios_client;