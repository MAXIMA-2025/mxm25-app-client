import React from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/images/logoDivisi/nexus.png";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import backgroundImage from "@/assets/images/onboarding.webp"

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <section
      className="h-screen bg-black/60 w-full flex flex-col items-center gap-4 justify-center px-2 py-32 sm:px-4 md:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundBlendMode: "darken",
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <img className="w-34 z-1 md:w-40 drop-shadow-2xl" src={Logo} />
        <div className="flex flex-col mt-2 gap-2 drop-shadow-2xl">
          <h1 className="font-fraunces text-white text-center text-5xl font-semibold">
            404 NOT FOUND
          </h1>
          <h1 className="font-futura text-white text-center text-xl font-medium">
            Hai, kami Nexus, dan kamu nyasar.
          </h1>
        </div>
          <Button className="mt-2" variant="secondary" onClick={handleClick}>
            Kembali ke website <ArrowRight />
          </Button>
      </div>
    </section>
  );
};

export default ErrorPage;
