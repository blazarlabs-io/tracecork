import { useEffect, useRef, useState } from "react";

export const useAutosave = (
  onSave: () => void,
  delay = 10,
  deps: any[] = [],
) => {
  const [autosaveCount, setAutosaveCount] = useState<number>(delay);

  const savedCallback: any = useRef(); // to save the current "fresh" callback

  // keep callback ref up to date
  useEffect(() => {
    savedCallback.current = onSave;
  }, [onSave]);

  // create the interval
  useEffect(() => {
    let counter: number = delay;

    function runSaveCallback() {
      savedCallback.current();
    }

    if (typeof delay === "number") {
      // run the interval
      const interval = setInterval(() => {
        counter--;
        setAutosaveCount(counter);

        if (counter <= 0) {
          runSaveCallback();
          setAutosaveCount(delay);
          counter = delay;
        }
      }, 1000);
      // clean up on unmount or dependency change
      return () => clearInterval(interval);
    }
  }, [delay, ...deps]);

  return { autosaveCount };
};
