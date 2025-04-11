export const getFromLocalStorage = <T>(key: string) => {
  if (typeof window === "undefined") return;
  const storageData = window.localStorage.getItem(key);
  if (!storageData) return;
  const data = JSON.parse(storageData) as T;
  return data;
};

export const setToLocalStorage = <T>(key: string, newData: T) => {
  if (typeof window === "undefined") return;
  const newStorage = JSON.stringify(newData);
  window.localStorage.setItem(key, newStorage);
  return newData;
};

export const updateLocalStorage = <T>(key: string, updateData: Partial<T>) => {
  if (typeof window === "undefined") return;
  const current = getFromLocalStorage<T>(key);
  if (!current) return;
  const updatedData: T = { ...current, ...updateData };
  const newStorage = JSON.stringify(updatedData);
  window.localStorage.setItem(key, newStorage);
  return updatedData;
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
};
