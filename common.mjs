// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.
import { monthSelector } from "./month-selector.mjs";
export function getGreeting() {
    return "Hello";
}
import { activateMonthSelector } from "./month-selector.mjs";
import { renderCalendar } from "./render-month.mjs";

document.addEventListener("DOMContentLoaded", ()=>{
    const today = new Date();
    renderCalendar(today);
    activateMonthSelector(today);
});

