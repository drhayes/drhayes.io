import { writable } from 'svelte/store';
import { browser } from '$app/env';

const STORAGE_KEY = 'userPreferences';

// What are the defaults?
let initialValue = {
  isDarkMode: true,
};

const { subscribe, set, update } = writable(initialValue);

// If we're in  a browser context, serialize to localStorage.
if (browser) {
  const readPreferencesFromStorage = () => {
    const preferenceString = localStorage.getItem(STORAGE_KEY);
    if (preferenceString) {
      try {
        return JSON.parse(preferenceString);
      } catch (error) {
        console.error('Error deserializing preferences from storage', error);
      }
    }
  };

  // Is there anything in localStorage? Use that.
  const prefsFromStorage = readPreferencesFromStorage();
  if (prefsFromStorage) {
    initialValue = {
      ...initialValue,
      ...prefsFromStorage,
    };
  }

  // If it changes, put it back in localStorage.
  subscribe(value => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  });

  // Listen for storage events from other tabs/windows.
  window.addEventListener('storage', () => {
    const prefsFromStorage = readPreferencesFromStorage();
    if (prefsFromStorage) {
      set(prefsFromStorage);
    }
  });
}

// Set our initial value now that that's all settled.
set(initialValue);

const toggleDarkMode = (): void => {
  // Dark by default.
  update(prefs => ({
    ...prefs,
    isDarkMode: !prefs.isDarkMode
  }));
};

export default {
  subscribe,
  toggleDarkMode,
};
