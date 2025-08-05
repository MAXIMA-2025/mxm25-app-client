import HeroMain from "@/components/main/HeroMain";
import StationMain from "@/components/main/StationMain";
import {useRef} from "react";
import Divider1 from "@/assets/images/dividers/Divider 1-01.webp"
const Main = () => {
  const stationRef = useRef<HTMLElement>(null!);
  return (
    <div className="w-full h-dvh">
      <HeroMain scrollToRef={stationRef}/>
      {/* <div className="relative h-0">
        <div className="absolute w-fit h-fit bg-black">
          <img className="w-full relative h-150 mix" src={Divider1}/>
        </div>
      </div> */}
      <StationMain sectionRef={stationRef} />
    </div>
  );
};

export default Main;
