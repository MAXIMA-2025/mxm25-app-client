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
        // Send the code to your backend
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/google/callback`,
          {
            role,
          },
          {
            params: { code },
            withCredentials: true, // if backend sets cookies
          }
        );

        const { message } = res.data;
        toast.success(message);
        // Redirect to dashboard or homepage
        localStorage.removeItem("google-login-role"); // Bersihkan
        setIsLoggedOut(false);
        setTimeout(() => {
          nav("/main");
        }, 10000);
      } catch (err) {
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
