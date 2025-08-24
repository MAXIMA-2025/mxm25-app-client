import Background from "@/assets/asset_maxlearn/BG MAXLEARN-02.webp";
import {Button} from "@/components/ui/button";

const Maxsnap = () => {
  return (
    <div
      className="bg-cover pb-24 bg-black/70 bg-center flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 min-h-screen w-full"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundBlendMode: "darken",
      }}
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-fraunces sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          MAXSNAP
        </h1>
        <p className="text-sm font-futura sm:text-base md:text-lg text-white mb-4">
          Baca handbook berikut untuk teknis Challenge!
        </p>
      </div>
      <div className="w-full h-[70dvh] md:h-[64dvh] border-4 border-white rounded-2xl">
        <iframe
          src={`${
            import.meta.env.VITE_R2_URL
          }/public/challenges/HANDBOOK-MAXSNAP.pdf#zoom=80&toolbar=0&scrollbar=1`}
          className="w-full h-full rounded-2xl"
          title="PDF Viewer"
        />
      </div>

      <Button
        className="mt-7 p-7 cursor-pointer"
        onClick={() =>
          window.open(
            "https://drive.google.com/file/d/1Zq-I3txJ98CuyI7elFdS04j59Abj_hFH/view?usp=drivesdk",
            "_blank"
          )
        }
      >
        Akses Google Drive
      </Button>

      {/* PDF di atas kertas */}
      <div className="relative w-[95%] max-w-6xl mx-auto">
        {/* Kertas Background */}
        {/* <img src={Kertas} alt="Kertas" className="w-full h-auto relative z-0" /> */}

        {/* PDF Embed - ukurannya stabil */}
        
      </div>

    </div>
  );
};

export default Maxsnap;
