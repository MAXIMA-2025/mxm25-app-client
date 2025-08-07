import React from "react";

const ScreenIndicator: React.FC = () => {
  return (
    <div className="fixed bottom-2 left-2 z-[9999] px-3 py-1 rounded bg-black text-white text-xs font-mono pointer-events-none select-none">
      <span className="block sm:hidden">xs</span>
      <span className="hidden sm:block md:hidden">sm</span>
      <span className="hidden md:block lg:hidden">md</span>
      <span className="hidden lg:block xl:hidden">lg</span>
      <span className="hidden xl:block 2xl:hidden">xl</span>
      <span className="hidden 2xl:block">2xl</span>
    </div>
  );
};

export default ScreenIndicator;
