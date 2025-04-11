import { useState } from "react";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
  updateLocalStorage,
} from "../utils/local-storage";

export const useLocalStorage = <T>(key: string) => {
  const [localState, setLocalState] = useState<T | undefined>(() =>
    getFromLocalStorage<T>(key),
  );

  const setLocalStateHandler = (newData: T) => {
    setToLocalStorage(key, newData);
    setLocalState(newData);
  };

  const updateLocalStateHandler = (newData: Partial<T>) => {
    const updatedValue = updateLocalStorage(key, newData);
    if (!updatedValue) return;
    setLocalState(updatedValue);
  };

  const deleteLocalStateHandler = () => {
    removeFromLocalStorage(key);
    setLocalState(undefined);
  };

  return {
    localState,
    setLocalStateHandler,
    updateLocalStateHandler,
    deleteLocalStateHandler,
  };
};
