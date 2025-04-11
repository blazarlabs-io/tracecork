import { useState } from "react";

export const useCustomCountDown = (timeCount: number) => {
  // * STATES
  const [resendTimer, setResendTimer] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(-1);

  // * HANDLERS
  const startCountDown = () => {
    let counter = timeCount;
    clearInterval(resendTimer ? resendTimer : 0);
    const intervalId = setInterval(() => {
      setTimeLeft(counter);
      counter--;
      if (counter < 0) {
        clearInterval(intervalId);
        setTimeLeft(-1);
      }
    }, 1000);
    setResendTimer(intervalId);
  };

  return { timeLeft, startCountDown };
};
