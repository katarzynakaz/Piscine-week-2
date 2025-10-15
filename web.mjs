import { activateMonthSelector } from "./month-selector.mjs";
import { addNavigationButtons } from "./calendarButtons.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date();

  activateMonthSelector(today);
  addNavigationButtons();

  const modal = document.getElementById("eventModal");
  const closeModal = document.getElementById("closeModal");

  closeModal.onclick = () => (modal.style.display = "none");
  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
  };
});
