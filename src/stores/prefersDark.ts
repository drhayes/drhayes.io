import { writable } from 'svelte/store';
import { browser } from '$app/env';

const STORAGE_KEY = 'prefersDark';

// What are the defaults?
let initialValue = false;

// If we're in a browser, update from localStorage.
if (browser) {
  // Is there anything in localStorage?
  const storageVal = localStorage.getItem(STORAGE_KEY);
  // Test the browser media preference.
  const osPref = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  initialValue = typeof storageVal === 'string' ? (storageVal === 'true') : osPref;
}

const { subscribe, set, update } = writable(initialValue);

// If we're in  a browser context, serialize to localStorage.
if (browser) {
  // Listen for storage events from other tabs/windows.
  window.addEventListener('storage', () => {
    const prefersDark = localStorage.getItem(STORAGE_KEY);
    if (prefersDark) {
      set(prefersDark === 'true');
    }
  });

  // If it changes, read it out and set it.
  // The subscribe callback is *immediately and synchronously* called, so be sure
  // to read what's in localStorage before setting it or this call will overwrite
  // what's already there.
  subscribe(value => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  });
}

// Set our initial value now that that's all settled.
set(initialValue);

const toggleDarkMode = (): void => {
  update(prefersDark => !prefersDark);
};

export default {
  subscribe,
  toggleDarkMode,
};
