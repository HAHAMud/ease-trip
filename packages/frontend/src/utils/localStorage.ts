
export const setStorageItem = (key: string, value: object | string) => {
  try {
    const isObject = value instanceof Object;
    return localStorage.setItem(key, isObject ? JSON.stringify(value) : value);
  } catch (error) {
    console.error("Error setting item in localStorage:", error);
  }
}

export const getStorageItem = (key: string) => {
  return localStorage.getItem(key);
}