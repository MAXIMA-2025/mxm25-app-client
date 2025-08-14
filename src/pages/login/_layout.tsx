import useAuthContext from "@/hooks/useAuthContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const Layout = () => {
  const nav = useNavigate();
  const { isLoggedOut } = useAuthContext();
  useEffect(() => {
    console.log(isLoggedOut);
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

export default Layout;
