import { MemStorage } from './memory-storage';

let storage: Storage | undefined = undefined;

/**
 * Get session storage service
 *
 * in case browser settings prevents session storage
 * in-memory storage acts as a back.
 * It implements Storage type so it should not effect client side behaviour
 */
export function getSessionStorageService(): Storage {
  if (storage) {
    return storage;
  }
  storage = isStorageAvailable() ? window.sessionStorage : new MemStorage();
  return storage;
}

function isStorageAvailable(): boolean {
  try {
    const key = '_test_key_';
    const val = 'x';
    window.sessionStorage.setItem(key, val);
    const x = window.sessionStorage.getItem(key);
    window.sessionStorage.removeItem(key);
    return val === x;
  } catch (e) {
    return false;
  }
}

/**
 * Retrieve value from session storage
 * @param {string} key
 * @param {T} defaultValue OPTIONAL
 * @returns A tuple containing current value and a function to set a new value
 */
export function getSessionStorage<T>(key: string, defaultValue: T): [T, (newValue: T) => void] {
  const storageService = getSessionStorageService();
  const storedValue = storageService.getItem(key);
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue;

  const setValue = (newValue: T) => {
    storageService.setItem(key, JSON.stringify(newValue));
  };

  return [initialValue, setValue];
}

/**
 * Sets a value in session storage
 * @param {string} key
 * @param {T} value
 */
export function setSessionStorage<T>(key: string, value: T): void {
  const storageService = getSessionStorageService();
  storageService.setItem(key, JSON.stringify(value));
}
