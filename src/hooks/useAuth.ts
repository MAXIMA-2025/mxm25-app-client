import { useQuery } from "@tanstack/react-query";
import useApi, { ApiResponse } from "./useApi";
import useErrorHandler from "./useErrorHandler";
import useAuthContext from "./useAuthContext";

type UserPanitia = {
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

type UserOrganisator = {
  nim: string;
  nama: string;
  email: string;
  isVerified: boolean;
  stateId: number;
  state: {
    nama: string;
  };
  role: "mahasiswa" | "panitia" | "organisator" | "unknown";
};

const useAuth = () => {
  const { isLoggedOut } = useAuthContext();
  const api = useApi();
  const { handleError } = useErrorHandler(["authUser"]);

  const { data, isLoading, error, status } = useQuery<
    ApiResponse<UserPanitia | UserOrganisator>
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
    staleTime: 5 * 60 * 1000, // data akan basi setelah 5 mnt
    retry: 1,
    enabled: !isLoggedOut, // biar pas udah logout dia ga fetch lagi !! anjir gua debug ini berhari2 dan solusinya se simple ini tai emg
  });

  // const auth = { data, isLoading, error, status };
  const auth = {
    user: data?.data,
    status,
    isLoading,
    error,
  };

  // useHandleQueryError(auth);

  return auth;
};

export default useAuth;
