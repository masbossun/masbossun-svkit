import { browser } from "$app/env";
import { writable } from "svelte/store";

const defaultValue = null;
const initialValue = browser
  ? window.localStorage.getItem("theme") ?? defaultValue
  : defaultValue;

export const theme = writable<string>(initialValue);

theme.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem("theme", value);
    if (value === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-black-primary");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-black-primary");
    }
  }
});

export { theme as default };
