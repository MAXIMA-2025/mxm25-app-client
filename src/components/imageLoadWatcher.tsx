import React, { useEffect, useRef, useState } from "react";

interface ImageLoadWatcherProps {
  children: React.ReactNode;
  onAllLoaded?: () => void;
  fallback?: React.ReactNode;
}

const ImageLoadWatcher: React.FC<ImageLoadWatcherProps> = ({
  children,
  onAllLoaded,
  fallback = null,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    const imgs = Array.from(container.querySelectorAll("img"));

    if (imgs.length === 0) {
      setLoaded(true); // no images to load
      onAllLoaded?.();
      return;
    }

    let loadedCount = 0;
    let hasTriggered = false;

    const checkDone = () => {
      loadedCount++;
      if (loadedCount === imgs.length && !hasTriggered) {
        hasTriggered = true;
        setLoaded(true);
        onAllLoaded?.();
      }
    };

    imgs.forEach((img) => {
      if (img.complete) {
        checkDone();
      } else {
        img.addEventListener("load", checkDone);
        img.addEventListener("error", checkDone);
      }
    });

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("load", checkDone);
        img.removeEventListener("error", checkDone);
      });
    };
  }, [children]); // make sure it re-runs when children change

  return (
    <div ref={wrapperRef} style={{ display: "contents" }}>
      {loaded ? children : fallback}
    </div>
  );
};

export default ImageLoadWatcher;
