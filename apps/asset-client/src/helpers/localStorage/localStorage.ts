const saveToLocalStorage = (key: string, value: any) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

const loadFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
    return undefined;
  }
};

const removeFromLocalStorage = (key: string) => localStorage.removeItem(key);

export { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage };
