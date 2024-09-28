import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../Api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";



function ProtectedRoute({ children }) {
    const [ isAuthorized, setIsAuthorized ] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, [])

    const refreshToken = async () => {
        let refreshToken = localStorage.getItem(REFRESH_TOKEN);

        if (!refreshToken) {
            refreshToken = sessionStorage.getItem(REFRESH_TOKEN);
        }

        if (!refreshToken) {
            setIsAuthorized(false);
            return;
        }

        try {
            const res = await api.post("api/token/refresh/", {refresh: refreshToken});

            if (res.status === 200) {
                const originalStorage = localStorage.getItem(REFRESH_TOKEN) ? localStorage : sessionStorage;
                originalStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        let accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (!accessToken){
            accessToken = sessionStorage.getItem(ACCESS_TOKEN);
        }

        if (!accessToken) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(accessToken);
        const token_expiration = decoded.exp;
        const now = Date.now() / 1000;

        if (token_expiration < now) {
            await refreshToken();
        }else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return (
            <div>Loading...</div>
        )
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;