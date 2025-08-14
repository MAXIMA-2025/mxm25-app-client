import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Loading from "@/components/loading";

const Oauth = () => {
  const nav = useNavigate();

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
        nav("/main");
      } catch (err) {
        console.error(err);
        toast.error("Google login failed");
        localStorage.removeItem("google-login-role"); // Bersihkan
        nav("/login");
      }
    };

    handleGoogleCallback();
  }, [nav]);
  return <Loading />;
};

export default Oauth;
