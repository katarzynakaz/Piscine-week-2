import { renderCalendar } from "./render-month.mjs";

let currentDate = new Date();

export function activateMonthSelector(date = new Date()) {
    currentDate = date;

    const selectorButton = document.getElementById("selector-button");
    const monthSelector = document.getElementById("month-selector");
    const yearSelector = document.getElementById("year-selector");

    monthSelector.value = date.getMonth();
    createYearSelectOptions(yearSelector, currentDate.getFullYear());
    updateSelectors(currentDate);

    renderCalendar(currentDate);

    // Jump to selected date
    selectorButton.addEventListener("click", () => {
        currentDate = new Date(yearSelector.value, monthSelector.value);
        renderCalendar(currentDate);
        updateSelectors(currentDate);
    });

    // Previous / Next buttons
    const backwardButton = document.getElementById("backwardButton");
    const forwardButton = document.getElementById("forwardButton");

    backwardButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
        updateSelectors(currentDate);
    });

    forwardButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
        updateSelectors(currentDate);
    });
}

function createYearSelectOptions(yearSelector, selectedYear) {
    yearSelector.innerHTML = '';
    for (let year = selectedYear - 200; year <= selectedYear + 200; year++) {
        const opt = document.createElement("option");
        opt.value = year;
        opt.textContent = year;
        yearSelector.appendChild(opt);
    }
}

function updateSelectors(date) {
    const monthSelector = document.getElementById("month-selector");
    const yearSelector = document.getElementById("year-selector");

    monthSelector.value = date.getMonth();
    yearSelector.value = date.getFullYear();
}
