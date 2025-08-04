import HeroMain from "@/components/main/HeroMain";
import StationMain from "@/components/main/StationMain";
import {useRef} from "react";

const Main = () => {
  const stationRef = useRef<HTMLElement>(null!);
  return (
    <div className="w-full h-dvh">
      <HeroMain scrollToRef={stationRef}/>
      <StationMain sectionRef={stationRef} />
    </div>
  );
};

export default Main;
