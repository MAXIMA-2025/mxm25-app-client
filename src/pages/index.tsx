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
import ImageLoadWatcher from "@/components/imageLoadWatcher";
import Loading from "@/components/loading";

const index = () => {
  return (
    <div className="flex flex-col">
      <ImageLoadWatcher
        fallback={<Loading/>}
      >
        <HeroSection />
        {/* <AboutSection /> */}
      </ImageLoadWatcher>
    </div>
  );
};

export default index;
