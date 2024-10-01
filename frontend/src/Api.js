import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACK_URL
});

const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN) || sessionStorage.getItem(REFRESH_TOKEN);
    if (!storedRefreshToken) {
        return null; 
    }

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/api/token/refresh/`, {
            refresh: storedRefreshToken,
        });
        const newAccessToken = response.data.access;

        const storage = localStorage.getItem(REFRESH_TOKEN) ? localStorage : sessionStorage;
        storage.setItem(ACCESS_TOKEN, newAccessToken);

        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};

api.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN);

        if (token) {
            const decodedToken = jwtDecode(token);
            const tokenExpirationTime = decodedToken.exp * 1000;
            const currentTime = Date.now();

            // Check if the token is expired
            if (tokenExpirationTime < currentTime) {
                console.log("Token is expired. Attempting to refresh.");

                // Refresh the token if it's expired
                token = await refreshToken();

                if (!token) {
                    console.log("Unable to refresh token, redirecting to login.");
                    return Promise.reject(new Error("Session expired. Please log in again."));
                }
            }

            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
