import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import FAQSection from "@/components/landing/FAQSection";
import LoaderWrapper from "@/components/loaderWrapper";
import { useNavigate } from "react-router";
import useAuthContext from "@/hooks/useAuthContext";


const index = () => {
  const nav = useNavigate();
  const { isLoggedOut } = useAuthContext();
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedLanding");

    if (!hasVisited && !isLoggedOut) {
      // Mark that they've visited already
      sessionStorage.setItem("hasVisitedLanding", "true");
      nav("/main");
    }
  }, [nav, isLoggedOut]);
  return (
    <div className="flex flex-col">
      <LoaderWrapper>
        <HeroSection />
      </LoaderWrapper>
        {/* <AboutSection /> */}
    </div>
  );
};

export default index;
