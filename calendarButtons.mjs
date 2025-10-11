import { renderCalendar } from "./render-month.mjs";

export function addNavigationButtons() {
    const forwardButton = document.createElement("button");
    const backwardButton = document.createElement("button");
    forwardButton.setAttribute("id", "forwardButton");
    backwardButton.setAttribute("id", "backwardButton");
    forwardButton.innerText = "Next Month";
    backwardButton.innerText = "Previous Month";
    const calendarWrapDiv = document.getElementById("calendar-wrap-div");
    calendarWrapDiv.after(forwardButton);
    calendarWrapDiv.after(backwardButton);
    // retrieve already rendered date from calendar dom:
    const renderedDate = new Date(calendarWrapDiv.getAttribute("data-renderedDate"));
    forwardButton.addEventListener("click", () => {
        renderedDate.setMonth(renderedDate.getMonth() + 1);
        renderCalendar(renderedDate);
    });
    backwardButton.addEventListener("click", () => {
        renderedDate.setMonth(renderedDate.getMonth() - 1);
        renderCalendar(renderedDate);
    });
}