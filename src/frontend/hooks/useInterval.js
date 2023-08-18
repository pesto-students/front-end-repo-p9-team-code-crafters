import {useEffect, useState} from "react";

export const useInterval = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setCount((previousCount) => previousCount + 10);
      }, 200);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const startInterval = () => {
    setIsRunning(true);
  };

  const stopInterval = () => {
    setIsRunning(false);
  };

  const resetCount = () => {
    setCount(0);
  };

  return {startInterval, count, stopInterval, resetCount};
};
