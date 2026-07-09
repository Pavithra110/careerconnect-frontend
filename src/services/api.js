import axios from "axios";

const api = axios.create({
    baseURL: "https://careerconnect-backend-production-7399.up.railway.app/api"
});

export default api;