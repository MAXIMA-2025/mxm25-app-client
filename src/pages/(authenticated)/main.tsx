import HeroMain from "@/components/main/HeroMain";
import StationMain from "@/components/main/StationMain";
import { useRef } from "react";
import divider2 from "@/assets/images/dividers/divider2.webp";

const Main = () => {
  const stationRef = useRef<HTMLElement>(null!);
  return (
    <div className="w-full h-dvh">
      <HeroMain scrollToRef={stationRef} />
      <div className="relative z-1">
        <img
          className="w-full h-80 -top-42 z-1 absolute object-cover"
          src={divider2}
        />
      </div>
      <StationMain sectionRef={stationRef} />
    </div>
  );
};

export default Main;
