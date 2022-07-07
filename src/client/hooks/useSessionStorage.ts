import { useCallback, useState } from 'react';

export function useSessionStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      } else {
        const valueToStore =
          initialValue instanceof Function
            ? initialValue(storedValue)
            : initialValue;

        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));

        return initialValue;
      }
    } catch (error) {
      console.error(error);

      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: (args0: any) => any) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
