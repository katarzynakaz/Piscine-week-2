import { renderCalendar } from "./render-month.mjs";

export function addNavigationButtons() {
    const forwardButton = document.getElementById("forwardButton");
    const backwardButton = document.getElementById("backwardButton");
    const calendarContainer = document.getElementById("calendarContainer");
    const renderedDate = new Date(calendarContainer.getAttribute("data-renderedDate"));
    
    forwardButton.addEventListener("click", () => {
        renderedDate.setMonth(renderedDate.getMonth() + 1);
        calendarContainer.innerHTML = '';
        renderCalendar(renderedDate);
    });
    backwardButton.addEventListener("click", () => {
        renderedDate.setMonth(renderedDate.getMonth() - 1);
        calendarContainer.innerHTML = '';
        renderCalendar(renderedDate);
    });
}