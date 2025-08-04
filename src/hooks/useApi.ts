import { QueryClient, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import useErrorHandler from "./useErrorHandler";
import useAuthContext from "./useAuthContext";

export type ApiResponse<T = undefined> = {
  status: string;
  message: string;
  data: T;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    const response = await api.get("/auth/refresh", { withCredentials: true });
    return response;
  } catch {
    throw new Error("Failed to refresh token");
  }
};

const setupInterceptors = (
  queryClient: QueryClient,
  handleError: (error: unknown) => void,
  isLoggedOut: boolean,
  setIsLoggedOut: (val: boolean) => void
) => {
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;

      // 👉 Cegah infinite loop: jangan retry untuk request ke /auth/refresh
      if (originalRequest?.url?.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      // cek status isLoggedOut
      if (isLoggedOut) {
        handleError(error);
        return Promise.reject(error);
      }

      // cek response nya 401 ga
      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        console.log("Interceptor triggered for 401, isLoggedOut:", isLoggedOut);
        originalRequest._retry = true;
        try {
          await refreshToken();
          // return api(originalRequest);
          return;
        } catch (error) {
          queryClient.removeQueries({ queryKey: ["authUser"] });
          setIsLoggedOut(true);
          handleError(error);
          return Promise.reject(error);
        }
      }

      handleError(error);
      return Promise.reject(error);
    }
  );
};

const useApi = () => {
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();
  const { isLoggedOut, setIsLoggedOut } = useAuthContext();
  const isInterceptorSet = useRef(false);

  useEffect(() => {
    if (!isInterceptorSet.current) {
      setupInterceptors(queryClient, handleError, isLoggedOut, setIsLoggedOut);
      isInterceptorSet.current = true;
    }
  }, [queryClient, handleError, isLoggedOut, setIsLoggedOut]);

  return api;
};

export default useApi;
