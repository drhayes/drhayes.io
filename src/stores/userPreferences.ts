import { writable } from "svelte/store";

const { subscribe, set, update } = writable({
  isDarkMode: true,
});

subscribe(value => {
  console.log(value);
});

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
