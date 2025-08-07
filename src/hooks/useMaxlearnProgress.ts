// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

/**
 * Custom hook for managing state in Local Storage.
 * It loads the initial state from Local Storage and saves it on every change.
 * @param key The key to use in Local Storage.
 * @param initialValue The initial value if no data is found in Local Storage.
 */
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
    // Gunakan useState untuk mengelola state dengan nilai awal dari Local Storage
    const [value, setValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            // Parse nilai JSON dari Local Storage, atau gunakan nilai awal
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading from Local Storage key "${key}":`, error);
            return initialValue;
        }
    });

    // Gunakan useEffect untuk menyimpan state ke Local Storage setiap kali 'value' berubah
    useEffect(() => {
        try {
            // Simpan nilai state ke Local Storage
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving to Local Storage key "${key}":`, error);
        }
    }, [key, value]);

    return [value, setValue] as const;
};