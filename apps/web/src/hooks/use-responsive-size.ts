import { useEffect, useState } from "react";

export type Device = "desktop" | "tablet" | "mobile";

export const useResponsiveSize = () => {
  const [width, setWidth] = useState<number>(0);
  const [device, setDevice] = useState<Device>("desktop");
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
    if (window.innerWidth <= 860) {
      setDevice("mobile");
      // console.log("mobile");
    } else if (window.innerWidth <= 1280) {
      setDevice("tablet");
      // console.log("tablet");
    } else {
      setDevice("desktop");
      // console.log("desktop");
    }
  };

  useEffect(() => {
    handleWindowSizeChange();

    /* Inside of a "useEffect" hook add 
           an event listener that updates
           the "width" state variable when 
           the window size changes */
    window.addEventListener("resize", handleWindowSizeChange);

    // Return a function from the effect
    // that removes the event listener
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { width, device };
};
