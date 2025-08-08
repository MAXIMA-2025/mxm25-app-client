<<<<<<< HEAD
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import FAQSection from "@/components/landing/FAQSection";
import LoaderWrapper from "@/components/loaderWrapper";

const index = () => {
  return (
    <div className="flex flex-col">
      <LoaderWrapper>
        <HeroSection />
      </LoaderWrapper>
        {/* <AboutSection /> */}
    </div>
  );
};
=======
import React from 'react'

const index = () => {
  return (
    <div>
      <h1 className="font-fraunces font-bold text-4xl">Fraunces Bold</h1>
      <p className="font-fraunces font-light italic">
        Fraunces Light Italic with Variable Font
      </p>
      <p
        className="font-fraunces"
        style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}
      >
        Fraunces with SOFT 100 & WONK 1
      </p>
      <h1 className="font-futura font-bold text-4xl">Futura Bold</h1>
      <p className="font-futura font-light italic">
        Futura Light Italic with Variable Font
      </p>
      <p
        className="font-futura font-bold"
      >
        Futura
      </p>
>>>>>>> ec1be48dffed1e00531ab77d7b5da182716915ee

    </div>
  )
}

export default index