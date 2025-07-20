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

const Oauth = () => {
  return (
    <div>
      <Card className="w-2xs">
        <CardHeader>
          <CardTitle>Register with google</CardTitle>
          <CardDescription>Access our website easily using your google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Oauth;
