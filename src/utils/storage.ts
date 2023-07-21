// localStorageUtils.ts

export const getItemFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error parsing localStorage item:', error);
      return null;
    }
  }
  return null;
};

export const setItemInLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error serializing localStorage item:', error);
  }
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};
