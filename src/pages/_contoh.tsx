import React from "react";
import backgroundImage from "@/assets/images/onboarding.webp";
import Maxlearn from "@/assets/asset_maxlearn/Asset MAXLEARN.png";

const contoh = () => {
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
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 border-4 border-white">
        <div className="border-4 border-white flex flex-col items-center justify-center bg-black p-24 m-10">
          <h1 className="font-fraunces text-6xl text-white">INI UTAMA</h1>
          <p className="font-futura text-2xl text-blue-50">INI PARAGRAF</p>
        </div>
        <img src={Maxlearn} className="w-1/3" />
      </div>
    </section>
  );
};

export default contoh;
