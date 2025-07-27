import useAuthContext from "@/hooks/useAuthContext";
import { useNavigate } from "@/router";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import useErrorHandler from "@/hooks/useErrorHandler";

const Sso = () => {
  const { setIsLoggedOut, isLoggedOut } = useAuthContext();
  const loc = useLocation();
  const nav = useNavigate();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const runSso = async () => {
      const searchParams = new URLSearchParams(loc.search);
      const ticket = searchParams.get("ticket");

      if (isLoggedOut) {
        nav("/");
        return;
      }

      if (!ticket) {
        toast.error("Invalid SSO ticket.");
        nav("/login");
        return;
      }

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/sso`,
          {
            ticket,
            issuer: encodeURIComponent(
              import.meta.env.VITE_CLIENT_URL + "/sso"
            ),
          },
          { withCredentials: true }
        );

        setIsLoggedOut(false);
        nav("/main"); // ✅ redirect ke /main kalau berhasil login
      } catch (error) {
        console.error("SSO Login Error:", error);
        handleError(error);
        toast.error("Gagal login melalui SSO. Silakan coba lagi.");
        nav("/login"); // ❌ redirect ke login kalau gagal
      }
    };

    runSso();
  }, [loc.search, isLoggedOut, nav, setIsLoggedOut, handleError]);

  return null;
};

export default Sso;
