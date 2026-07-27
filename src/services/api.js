import axios from "axios";

const api = axios.create({
    baseURL: "https://careerconnect-backend-ruxq.onrender.com/api"
});

export default api;