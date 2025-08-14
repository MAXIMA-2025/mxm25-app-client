import Navbar from "@/components/main/Navbar";
import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import useAuthContext from "@/hooks/useAuthContext";
import useApi, { type ApiResponse } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import useErrorHandler from "@/hooks/useErrorHandler";
import { ToggleProvider } from "@/contexts/ToggleContext";

type Toggle = {
  id: number;
  nama: string;
  isOn: boolean;
};

const Layout = () => {
  const nav = useNavigate();
  const { isLoggedOut } = useAuthContext();
  const api = useApi();

  const { data: toggleAcara, status } = useQuery({
    queryKey: ["toggles"],
    queryFn: async () => {
      const resp = await api.get<ApiResponse<Toggle[]>>("/toggle");
      return resp.data;
    },
  });

  useEffect(() => {
    if (isLoggedOut) {
      toast.error("Silahkan login terlebih dahulu");
      nav("/login");
    }
  }, [nav, isLoggedOut]);

  // Map react-query status to ToggleContextType status
  const mappedStatus = status === "pending" ? "loading" : status;

  return (
    <ToggleProvider
      value={{ toggleAcara: toggleAcara?.data, status: mappedStatus }}
    >
      <div className="flex flex-col items-center">
        <Outlet />
        <Navbar />
      </div>
    </ToggleProvider>
  );
};

export default Layout;
