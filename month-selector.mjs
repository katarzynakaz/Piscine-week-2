import { renderCalendar } from "./render-month.mjs";

export function activateMonthSelector(date = new Date()) {
    const selectorButton = document.getElementById("selector-button");
    //set selected Month option
    const monthSelector = document.getElementById("month-selector");
    monthSelector.value = date.getMonth();

    const yearSelector = document.getElementById("year-selector");
    createYearSelectOptions(yearSelector, date.getFullYear());
    //set selected year option
    yearSelector.value = date.getFullYear();

    selectorButton.addEventListener("click", () => {
        const newDate = new Date(yearSelector.value, monthSelector.value);
        alert(newDate);
        /*
        const calendarContainer = document.getElementById("calendarContainer");
        calendarContainer.innerHTML = '';
        renderCalendar(newDate);
        */
    });
}

function createYearSelectOptions(yearSelector, selectedYear) {
    for (let year = selectedYear - 200; year < selectedYear + 200; year++) {
        const opt = document.createElement("option");
        opt.value = year;
        opt.textContent = year;
        yearSelector.appendChild(opt);
    }
}