import Navbar from "@/components/main/Navbar";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useApi, { type ApiResponse } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ToggleProvider } from "@/contexts/ToggleContext";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/loading";

type Toggle = {
  id: number;
  nama: string;
  isOn: boolean;
};

const Layout = () => {
  const nav = useNavigate();
  const api = useApi();
  const {
    user,
    isLoading: authLoading,
    error: authError,
    status: authStatus,
  } = useAuth();

  // Call useQuery ALWAYS, but control execution via enabled flag
  const { data: toggleAcara, status: toggleStatus } = useQuery({
    queryKey: ["toggles"],
    queryFn: async () => {
      const resp = await api.get<ApiResponse<Toggle[]>>("/toggle");
      return resp.data;
    },
    enabled: !!user, // won't fetch until user exists
  });

  // Redirect after auth check
  useEffect(() => {
    if (!authLoading && (authStatus === "error" || !user)) {
      toast.error("Silahkan login terlebih dahulu");
      nav("/login");
    }
  }, [authLoading, authStatus, user, nav]);

  // Show loading until auth finishes
  if (authLoading) {
    return <Loading />;
  }

  // Block render until redirect happens
  if (authStatus === "error" || !user) {
    return null;
  }

  const mappedStatus = toggleStatus === "pending" ? "loading" : toggleStatus;

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
