import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import useApi, { ApiResponse } from "./useApi";
import useErrorHandler from "./useErrorHandler";
import useAuthContext from "./useAuthContext";

export type Auth<T = UserPanitia | UserOrganisator | UserEksternal> = {
  user: T | undefined;
  status: "error" | "success" | "pending";
  isLoading: boolean;
  error: Error | null;
  isSuperAdmin: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<ApiResponse<UserPanitia | UserOrganisator | UserEksternal>, Error>
  >;
};

export type UserPanitia = {
  uuid: string;
  nama: string;
  nim: string;
  isVerified: boolean;
  divisiId: number;
  divisi: {
    id: number;
    nama: string;
  };
  role: "mahasiswa" | "panitia" | "organisator" | "unknown";
  email: string;
};

export type UserOrganisator = {
  uuid: string;
  nim: string;
  nama: string;
  email: string;
  namaOrganisasi: string;
  isVerified: boolean;
  stateId: number;
  state: {
    nama: string;
  };
  role: "mahasiswa" | "panitia" | "organisator" | "unknown";
};

export type UserEksternal = {
  id: number;
  googleId: string;
  firstName: string;
  lastName: string;
  picture: string;
  role: string;
  email: string;
}

const useAuth = () => {
  const { isLoggedOut } = useAuthContext();
  const api = useApi();
  const { handleError } = useErrorHandler(["authUser"]);

  const { data, isLoading, error, status, refetch } = useQuery<
    ApiResponse<UserPanitia | UserOrganisator | UserEksternal>
  >({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await api.get("/auth/me");
        if (!response.data) throw new Error("Failed to fetch user data");
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    staleTime: Infinity, // data akan basi setelah 5 mnt
    retry: 1,
    enabled: !isLoggedOut, // biar pas udah logout dia ga fetch lagi !! anjir gua debug ini berhari2 dan solusinya se simple ini tai emg
    refetchInterval: (query) => {
      const user = query.state.data?.data;
      return user && user.isVerified === false ? 60000 : false;
    },
  });

  // const auth = { data, isLoading, error, status };
  const panitiaData = data as ApiResponse<UserPanitia>;
  const isSuperAdmin =
    data?.data.role === "panitia" && panitiaData.data.divisiId === 2;

  const auth: Auth = {
    user: data?.data,
    status,
    isLoading,
    error,
    isSuperAdmin,
    refetch,
  };

  // useHandleQueryError(auth);

  return auth;
};

export default useAuth;
