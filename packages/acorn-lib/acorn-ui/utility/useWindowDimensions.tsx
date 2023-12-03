import { useEffect, useLayoutEffect, useState } from "react";

function getWindowDimensions() {
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,
      isMobile: false,
    };
  }

  const { innerWidth: width, innerHeight: height } = window;

  const isMobile = width < 768;

  return {
    width,
    height,
    isMobile,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const useBrowserLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useBrowserLayoutEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
