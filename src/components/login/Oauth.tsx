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
import useApi, { type ApiResponse } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";

type googleAuth ={
  authUrl: string;
}

const Oauth = () => {
  const handleGoogleReg = async () =>{
    const api = useApi();
    const { data: states, status, isLoading, error } = useQuery({
      queryKey: ["authUrl"],
      queryFn: async () => {
        const resp = await api.get<ApiResponse<googleAuth>>("/auth/google");
        console.log(resp.data);
      }
    });
  useHandleQueryError({ error, status }); // handle query error
  if (isLoading) return <p>Loading...</p>; // handle jika sedang loading
  if (error) return <p>Error: {String(error)}</p>; // error handling tambahan, jika perlu
  }
  // const handleGoogleRegister = async () => {
  //   try {
  //     const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/google`, {
  //       withCredentials: true,
  //     });
  //     console.log(res)
  //     const authUrl = res?.data?.data?.authUrl;
      
  //     console.log(authUrl);
  //     if (authUrl) {
  //         window.location.href = authUrl;
  //     } else {
  //       throw new Error("No auth URL returned");
  //     }
  //   } catch (error) {
  //     console.error("Error starting Google OAuth:", error);
  //     alert("Something went wrong. Please try again."); 
  //   }
  // };
  const handleGoogleLogin =() =>{

  };

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
          <Button onClick={handleGoogleRegister} variant="test" className="w-full bg-amber-400">Register with G</Button>
          <Button onClick={handleGoogleLogin} className="w-full">Register with G</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Oauth;
function useHandleQueryError(arg0: { error: Error | null; status: "error" | "success" | "pending"; }) {
  throw new Error("Function not implemented.");
}

