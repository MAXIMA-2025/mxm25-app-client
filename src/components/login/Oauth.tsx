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
import axios from "axios";

const Oauth = () => {
  const handleGoogleRegister = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/google`, {
        withCredentials: true,
      });
      console.log(res)
      const authUrl = res?.data?.data?.authUrl;
      
      console.log(authUrl);
      if (authUrl) {
          window.location.href = authUrl;
      } else {
        throw new Error("No auth URL returned");
      }
    } catch (error) {
      console.error("Error starting Google OAuth:", error);
      alert("Something went wrong. Please try again.");
    }
  };
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
          <Button onClick={handleGoogleRegister} className="w-full">Register with G</Button>
          <Button onClick={handleGoogleLogin} className="w-full">Register with G</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Oauth;
