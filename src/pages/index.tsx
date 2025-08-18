import HeroSection from "@/components/landing/HeroSection";
import LoaderWrapper from "@/components/loaderWrapper";
import AboutSection from "@/components/landing/AboutSection"


const index = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <LoaderWrapper>
        <HeroSection />
        <AboutSection />
      </LoaderWrapper>
    </div>
  );
};

export default index;
