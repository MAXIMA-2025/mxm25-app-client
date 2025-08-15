import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Loading from "@/components/loading";
import useAuthContext from "@/hooks/useAuthContext";

const Oauth = () => {
  const nav = useNavigate();
  const { setIsLoggedOut } = useAuthContext();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const role = localStorage.getItem("google-login-role");
      if (!code) {
        toast.error("Authorization code not found.");
        nav("/login");
        return;
      }
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/google/callback`,
          { role },
          { params: { code }, withCredentials: true }
        );

        toast.success(res.data.message);
        localStorage.removeItem("google-login-role");
        setIsLoggedOut(false);

        // ✅ Verify login by fetching the logged-in user
        const userRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          { withCredentials: true }
        );

        if (userRes.data?.status === "success") {
          nav("/main");
        } else {
          toast.error("Login verification failed.");
          nav("/login");
        }
      } catch (err) {
        console.log("ada error");
        if (axios.isAxiosError(err)) {
          console.error("Google login failed:", {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
            headers: err.response?.headers,
            config: err.config,
          });
          toast.error(
            err.response?.data?.message || `Google login failed: ${err.message}`
          );
        } else {
          console.error("Unexpected error:", err);
          toast.error("An unexpected error occurred during Google login");
        }

        localStorage.removeItem("google-login-role");
        nav("/login");
      }
    };

    handleGoogleCallback();
  }, [nav, setIsLoggedOut]);
  return <Loading />;
};

export default Oauth;
