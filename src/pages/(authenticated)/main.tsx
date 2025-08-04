import HeroMain from "@/components/main/HeroMain";
import StationMain from "@/components/main/StationMain";
import React from "react";

const Main = () => {
  return (
    <div className="w-full h-dvh">
      <div className="w-full h-full fixed bg-gradient-to-b from-transparent via-transparent to-black opacity-35"/>
      <HeroMain />
      <StationMain />
    </div>
  );
};

export default Main;
