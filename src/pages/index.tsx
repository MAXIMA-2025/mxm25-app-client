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

const index = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FAQSection />
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
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
      <p className="font-futura font-bold">Futura</p>
      <p className="font-fraunces text-2xl font-bold"> ini fraunces</p>
    </div>
  );
};

export default index;
