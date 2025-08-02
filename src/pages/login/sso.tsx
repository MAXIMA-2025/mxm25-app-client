import useAuthContext from "@/hooks/useAuthContext";
import { useNavigate } from "@/router";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { toast } from "sonner";
import useErrorHandler from "@/hooks/useErrorHandler";

const Sso = () => {
  const { setIsLoggedOut, isLoggedOut } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();
  const hasRun = useRef(false); // Prevent double execution

  useEffect(() => {
    // Prevent double execution
    if (hasRun.current) return;
    hasRun.current = true;

    const runSso = async () => {
      const searchParams = new URLSearchParams(location.search);
      const ticket = searchParams.get("ticket");
      console.log(ticket);

      if (isLoggedOut) {
        navigate("/login/onboarding");
        return;
      }

      // Jika ticket tidak ada, error
      if (!ticket) {
        toast.error("SSO Ticket tidak ditemukan.");
        navigate("/login");
        return;
      }

      try {

        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/sso`,
          { ticket, issuer:encodeURIComponent(
            import.meta.env.VITE_CLIENT_URL+"/login/sso"
          ),

           },
          { withCredentials: true }
        );

        setIsLoggedOut(false);
        navigate("/main");
      } catch (err) {
        handleError(err);
        console.error(err);
        toast.error("Gagal login melalui SSO. Silakan coba lagi.");
        navigate("/login/mahasiswa");
      }
    };

    runSso();
  }, [location.search]); // Remove isLoggedOut from dependency
};

export default Sso;
