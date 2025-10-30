export const toggleItem = (key: string): void => {
  const currentValue = localStorage.getItem(key);
  const newValue = currentValue === "false" ? "true" : "false";
  localStorage.setItem(key, newValue);
};

export const setItem = (key: string, value:any): void => {
  localStorage.setItem(key, value);
};

export const getItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const clear = (): void => {
  localStorage.clear();
};
