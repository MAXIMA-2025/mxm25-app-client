import {
  type QueryObserverResult,
  type RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import useApi, { type ApiResponse } from "./useApi";
import useErrorHandler from "./useErrorHandler";
import useAuthContext from "./useAuthContext";

export type Auth<
  T = UserPanitia | UserOrganisator | UserEksternal | UserMahasiswa
> = {
  user: T | undefined;
  status: "error" | "success" | "pending";
  isLoading: boolean;
  error: Error | null;
  isSuperAdmin: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<
      ApiResponse<
        UserPanitia | UserOrganisator | UserEksternal | UserMahasiswa
      >,
      Error
    >
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
};

// {"json":{"uuid":"b9d17ad5-a48c-4603-9351-44347cdd9a1d","nim":"00000090103","nama":"deswandy wong","email":"deswandy.wong@student.umn.ac.id","angkatan":2025,"prodi":"Teknik Komputer","whatsapp":"081290949233","lineId":"deswadny_123","role":"mahasiswa"}}

export type UserMahasiswa = {
  uuid: string;
  nim: number;
  nama: string;
  email: string;
  angkatan: number;
  prodi: string;
  whatsapp: string;
  lineId: string;
  role: string;
};

const useAuth = () => {
  const { isLoggedOut } = useAuthContext();
  const api = useApi();
  const { handleError } = useErrorHandler(["authUser"]);

  const { data, isLoading, error, status, refetch } = useQuery<
    ApiResponse<UserPanitia | UserOrganisator | UserEksternal | UserMahasiswa>
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
      return user ? 60000 : false;
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
