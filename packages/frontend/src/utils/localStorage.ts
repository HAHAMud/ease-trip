
export const setStorageItem = (key: string, value: object | string) => {
  const isObject = value instanceof Object;
  return localStorage.setItem(key, isObject ? JSON.stringify(value) : value);
}

export const getStorageItem = (key: string) => {
  return localStorage.getItem(key);
}