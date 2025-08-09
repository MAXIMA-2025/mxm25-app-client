import useAuth from "@/hooks/useAuth";
import useAuthContext from "@/hooks/useAuthContext";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const _layout = () => {
  const nav = useNavigate();
  const { isLoggedOut } = useAuthContext();
  useEffect(() => {
    console.log(!isLoggedOut);
    if (!isLoggedOut) {
      nav("/main");
    }
  }, [isLoggedOut, nav]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default _layout;
