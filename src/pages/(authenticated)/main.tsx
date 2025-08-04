import HeroMain from "@/components/main/HeroMain";
import StationMain from "@/components/main/StationMain";
import React, {useRef} from "react";

const Main = () => {
  const stationRef = useRef(null);
  return (
    <div className="w-full h-dvh">
      <div className="w-full h-full fixed bg-gradient-to-b from-transparent via-transparent to-black opacity-35"/>
      <HeroMain scrollToRef={stationRef}/>
      <StationMain sectionRef={stationRef} />
    </div>
  );
};

export default Main;
