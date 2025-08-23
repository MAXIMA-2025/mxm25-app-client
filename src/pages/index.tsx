import HeroSection from "@/components/landing/HeroSection";
import LoaderWrapper from "@/components/loaderWrapper";
import AboutSection from "@/components/landing/AboutSection";
import Footer from "@/components/Footer";

const index = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <LoaderWrapper>
        <HeroSection />
        <AboutSection />
        <Footer/>
      </LoaderWrapper>
    </div>
  );
};

export default index;
