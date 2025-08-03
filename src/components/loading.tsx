import React from "react";
import backgroundImg from "../assets/images/hero/BACKGROUND.webp";
import logo from "../assets/images/logo.png";
import { Card } from "./ui/card";

const Loading = () => {
  return (
    <section
      className="min-h-screen max-w-screen bg-white flex flex-col gap-4 items-center justify-center px-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-4 items-center">
        <img src={logo} alt="MAXIMA Logo" className="size-40 object-contain" />
        <Card className="p-4 flex flex-col items-center  justify-center">
          <h1 className="font-fraunces text-4xl font-semibold animate-pulse text-shadow-accent">
            Loading ...
          </h1>
        </Card>
      </div>
    </section>
  );
};

export default Loading;
