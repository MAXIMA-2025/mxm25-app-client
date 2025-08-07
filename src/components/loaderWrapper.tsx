// LoaderWrapper.tsx
import React, { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";

type Props = {
  children: React.ReactNode;
};

const LoaderWrapper = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedCount, setLoadedCount] = useState(0); //total loaded images
  const [totalImages, setTotalImages] = useState(0); //total images inside the children component
  const [allLoaded, setAllLoaded] = useState(false); // flag for informing the load has finished

  useEffect(() => {
    const images = containerRef.current?.querySelectorAll("img") || [];
    const total = images.length;
    setTotalImages(total);

    if (total === 0) {
      setAllLoaded(true); // No images to wait for
      return;
    }

    let loaded = 0;

    const handleLoad = () => {
      loaded++;
      setLoadedCount(loaded);
      if (loaded === total) {
        setTimeout(() => {
          setAllLoaded(true); //finished loading
        }, 300); // optional delay
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener("load", handleLoad);
        img.addEventListener("error", handleLoad); // count failed ones too
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleLoad);
      });
    };
  }, [children]);

  const progress = totalImages
    ? Math.round((loadedCount / totalImages) * 100)
    : 100;

  return (
    <>
      {!allLoaded && (
        <>
          <div className="fixed inset-0 bg-black/80 z-[9999] flex flex-col items-center justify-center transition-opacity">
              <h1 className="text-2xl text-white font-fraunces font-bold mb-2">
                ~ Loading ~
              </h1>
              <div className="w-64 h-2 border-white border-1 bg-gray-300 rounded overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
          </div>
        </>
      )}
      <div ref={containerRef}>
        {children}
      </div>
    </>
  );
};

export default LoaderWrapper;
