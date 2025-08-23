import HeroMain from "@/components/main/HeroMain";
import StationMain from "@/components/main/StationMain";
import { useRef } from "react";
import divider2 from "@/assets/images/dividers/divider2.webp";
import LoaderWrapper from "@/components/loaderWrapper";
import ChallengeMaxima from "@/components/main/ChallengeMaxima";
import { useToggle } from "@/contexts/ToggleContext";
import useAuth from "@/hooks/useAuth";

const Main = () => {
  const stationRef = useRef<HTMLElement>(null!);
  const auth = useAuth();
  return (
    <div className="w-full h-dvh">
      <LoaderWrapper>
        <HeroMain scrollToRef={stationRef} />
        <div className="relative z-1">
          <img
            className="w-full h-80 -top-42 z-1 absolute object-cover drop-shadow-2xl"
            src={divider2}
          />
        </div>
        <StationMain sectionRef={stationRef} />

        {auth.user?.role === "mahasiswa" && (
          <>
            <div className="relative z-1">
              <img
                className="w-full h-80 -top-40 z-1 absolute object-cover drop-shadow-2xl"
                src={divider2}
              />
            </div>
            <ChallengeMaxima />
          </>
        )}
      </LoaderWrapper>
    </div>
  );
};

export default Main;
