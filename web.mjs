import { activateMonthSelector } from "./month-selector.mjs";
import { addNavigationButtons } from "./calendarButtons.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date();

  activateMonthSelector(today);
  addNavigationButtons();

});
