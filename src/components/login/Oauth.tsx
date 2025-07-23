import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useApi from "@/hooks/useApi";
import { useQuery, useMutation } from "@tanstack/react-query";

// ✅ Inline SuccessResponseModel
type SuccessResponseModel<T = undefined> = {
  status: string;
  message: string;
  data: T;
};

type GoogleAuthUrlResponse = {
  authUrl: string;
};

type GoogleUser = {
  email: string;
  name: string;
  role: "external" | "mahasiswa" | "panitia" | "organisator";
};

const Oauth = () => {
  const api = useApi();
  const [searchParams] = useSearchParams();

  // ✅ 1️⃣ Get Google Auth URL
  const {
    data: authUrl,
    isLoading: isLoadingUrl,
    isError: isErrorUrl,
  } = useQuery({
    queryKey: ["googleAuthUrl"],
    queryFn: async () => {
      const res = await api.get<SuccessResponseModel<GoogleAuthUrlResponse>>(
        "/auth/google"
      );
      return res.data.data.authUrl;
    },
    enabled: !searchParams.get("code"), // only run if not in callback mode
    retry: false,
  });

  // ✅ 2️⃣ Handle callback
  const {
    mutate,
    data: userData,
    isPending: isLoggingIn,
    isError: isErrorLogin,
    error: loginError,
  } = useMutation({
    mutationFn: async (code: string) => {
      const res = await api.get<SuccessResponseModel<{ user: GoogleUser }>>(
        `/auth/google/callback?code=${code}`
      );
      return res.data.data.user;
    },
  });

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      mutate(code);
    }
  }, [searchParams, mutate]);

  const handleGoogleLogin = () => {
    if (authUrl) {
      window.location.href = authUrl;
    }
  };

  if (isLoadingUrl) return <p>Loading login...</p>;
  if (isErrorUrl) return <p>Failed to get Google login URL.</p>;

  if (isLoggingIn) return <p>Processing login...</p>;
  if (isErrorLogin) return <p>Login failed: {String(loginError)}</p>;

  return (
    <div>
      <Card className="w-2xs">
        <CardHeader>
          <CardTitle>Register with google</CardTitle>
          <CardDescription>
            Access our website easily using your google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleGoogleLogin}
            variant="test"
            className="w-full bg-amber-400"
          >
            Register with G
          </Button>
          <Button onClick={handleGoogleLogin} className="w-full">
            Register with G
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Oauth;
function useHandleQueryError(arg0: {
  error: Error | null;
  status: "error" | "success" | "pending";
}) {
  throw new Error("Function not implemented.");
}
