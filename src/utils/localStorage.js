const storage = typeof window === "undefined" ? null : localStorage;

export const getLocalStorage = (key) =>
  JSON.parse(storage?.getItem(key) || "{}");

export const setLocalStorage = (key, value) =>
  storage?.setItem(key, JSON.stringify(value));

export const removeLocalStorage = (key) => storage?.removeItem(key);
