import Background from "@/assets/asset_maxlearn/BG MAXLEARN-02.png";
import HandbookPdf from "@/assets/asset_maxlearn/HANDBOOK MAXLEARN.pdf";
import Kertas from "@/assets/asset_maxlearn/Asset MAXLEARN.png";
import { useNavigate } from "react-router-dom";
import { useToggle } from "@/contexts/ToggleContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const toggle = useToggle();

  return (
    <div
      className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 min-h-screen w-full"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          MAXLEARN
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white">handbook</p>
      </div>

      {/* PDF di atas kertas */}
      <div className="relative w-[95%] max-w-6xl mx-auto">
        {/* Kertas Background */}
        <img src={Kertas} alt="Kertas" className="w-full h-auto relative z-0" />

        {/* PDF Embed - ukurannya stabil */}
        <div className="absolute top-[28%] left-1/2 transform -translate-x-1/2 w-[60%] h-[50%] z-10">
          <embed
            src={`${HandbookPdf}#zoom=80&toolbar=0&scrollbar=1`}
            type="application/pdf"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Button */}
      <Button
        onClick={() => navigate("/challenges/maxlearn/game")}
        className="font-medium py-3 px-6 sm:py-3 sm:px-8 md:py-4 md:px-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg"
        disabled={toggle.toggleAcara && !toggle.toggleAcara[3].isOn}
      >
        Mulai Challenge
      </Button>
    </div>
  );
};

export default Index;
