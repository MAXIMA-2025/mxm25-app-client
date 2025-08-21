import { useEffect, useRef } from "react";
import { useLoading } from "@/contexts/LoadingContext";

export const useImageLoader = () => {
  const { registerImage, imageLoaded } = useLoading();
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    registerImage();

    if (img.complete && img.naturalHeight !== 0) {
      imageLoaded(); // already loaded from cache
    } else {
      img.addEventListener("load", imageLoaded);
      img.addEventListener("error", imageLoaded); // still consider errored images as loaded

      return () => {
        img.removeEventListener("load", imageLoaded);
        img.removeEventListener("error", imageLoaded);
      };
    }
  }, []);

  return imgRef;
};
