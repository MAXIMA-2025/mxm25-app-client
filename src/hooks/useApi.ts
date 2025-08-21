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
  isLoggedOutRef: React.RefObject<boolean>,
  setIsLoggedOut: (val: boolean) => void
) => {
  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config;

      if (originalRequest?.url?.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true; // hanya untuk 1x percobaan
        try {
          await refreshToken();
          // 👉 hapus flag sebelum retry
          delete originalRequest._retry;
          return api(originalRequest);
        } catch (err) {
          queryClient.removeQueries({ queryKey: ["authUser"] });
          setIsLoggedOut(true);
          handleError(err);
          return Promise.reject(err);
        }
      }

      if (isLoggedOutRef.current) {
        handleError(error);
        return Promise.reject(error);
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

  const isLoggedOutRef = useRef(isLoggedOut);
  useEffect(() => {
    isLoggedOutRef.current = isLoggedOut;
  }, [isLoggedOut]);

  useEffect(() => {
    if (!isInterceptorSet.current) {
      setupInterceptors(
        queryClient,
        handleError,
        isLoggedOutRef,
        setIsLoggedOut
      );
      isInterceptorSet.current = true;
    }
  }, [queryClient, handleError, setIsLoggedOut]);

  return api;
};

export default useApi;
