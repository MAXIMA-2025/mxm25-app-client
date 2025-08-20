import React from "react";
import kayu from "@/assets/images/footer/footer.webp";
import kiri from "@/assets/images/footer/kiri.webp";
import kanan from "@/assets/images/footer/kanan.webp";
import medpar from "@/assets/images/footer/medpar.webp";
import sponsor from "@/assets/images/footer/sponsor.webp";

const Footer = () => {
  return (
    <section>
      <div
        className="flex flex-col md:flex-row items-center justify-around px-2 pt-4 md:px-10 pb-8"
        style={{
          backgroundImage: `url(${kayu})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="flex flex-col items-center px-6 w-full md:w-1/2 drop-shadow-2xl">
          <h1 className="font-futura font-medium text-2xl">Sponsored by</h1>
          <img src={sponsor} className="w-full drop-shadow-2xl"/>
        </div>
        <div className="flex flex-col items-center px-6 w-full md:w-1/2 drop-shadow-2xl">
          <h1 className="font-futura font-medium text-2xl">Media Partners</h1>
          <img src={medpar} className="w-full drop-shadow-2xl"/>
        </div>

      </div>
    </section>
  );
};

export default Footer;
