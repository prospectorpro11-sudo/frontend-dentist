import axiosInstance from "./baseServices";
import axios from "axios";
import instance from "./baseServices";
import { getUser, setUser } from "./tokenService";

const isAuthBypassPath = (url: string = "") => {
  const cleanUrl = String(url).toLowerCase();
  return cleanUrl.includes("/refresh-token") || cleanUrl.includes("/auth/google/start") || cleanUrl.includes("/auth/google/callback");
};

const setupInterceptors = () => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const user = getUser();

      if (user?.idToken && !isAuthBypassPath(config.url || "")) {
        config.headers.Authorization = `Bearer ${user.idToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const user = getUser();
      const originalConfig = error.config;

      if (error.response) {
        // Access Token was expired
        if (error.response.status === 403 && !originalConfig._retry) {
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
              // Retry the original request with the new token
              originalConfig.headers.Authorization = `Bearer ${id_token}`;
              return axios(originalConfig);
            }
          } catch (refreshError) {
            if (user) {
              setUser(null);
              window.location.reload();
            }

            // Handle refresh token error here
            console.error("Error refreshing token:", refreshError);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
