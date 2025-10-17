import { activateMonthSelector } from "./month-selector.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date();

  activateMonthSelector(today);

});
