const storage = typeof window === "undefined" ? null : localStorage;

export const getLocalStorage = (key) => {
  const value = storage?.getItem(key);

  return value ? JSON.parse(value) : null;
};

export const setLocalStorage = (key, value) => {
  storage?.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  storage?.removeItem(key);
};
