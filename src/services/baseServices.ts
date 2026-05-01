import axios from "axios";
import { getUser, setUser } from "./tokenService";

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const PROSPECTOR_BASE_URL = process.env.NEXT_PUBLIC_PROSPECTOR_URL;
const REQUEST_TIMEOUT = 50000;

const getInternalApiBaseUrl = () => {
    if (typeof window !== "undefined") {
        return window.location.origin;
    }

    return PUBLIC_BASE_URL;
};

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

const isAuthBypassPath = (url: string = "") => {
    const cleanUrl = String(url).toLowerCase();
    return cleanUrl.includes("/refresh-token") || cleanUrl.includes("/auth/google/start") || cleanUrl.includes("/auth/google/callback");
};

// Request interceptor — attach bearer token
instance.interceptors.request.use(
    (config) => {
        const user = getUser();
        if (user?.idToken && !isAuthBypassPath(config.url || "")) {
            config.headers.Authorization = `Bearer ${user.idToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — refresh token on 403
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const user = getUser();
        const originalConfig = error.config;

        if (error.response?.status === 403 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {
                const res = await instance.post("/refresh-token", {
                    refreshToken: user?.refreshToken,
                });

                const { id_token, refresh_token } = res.data;

                if (user) {
                    setUser({
                        ...user,
                        refreshToken: refresh_token,
                        idToken: id_token,
                    });
                }

                if (res.status === 200) {
                    originalConfig.headers.Authorization = `Bearer ${id_token}`;
                    return axios(originalConfig);
                }
            } catch (refreshError) {
                if (user) {
                    setUser(null);
                    window.location.reload();
                }
                console.error("Error refreshing token:", refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;

export const prospectorInstance = axios.create({
    baseURL: PROSPECTOR_BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export const internalApi = axios.create({
    baseURL: getInternalApiBaseUrl(),
    timeout: REQUEST_TIMEOUT,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export const instanceAuth = axios.create({
    timeout: REQUEST_TIMEOUT,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
