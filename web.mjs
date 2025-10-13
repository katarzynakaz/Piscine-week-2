// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
//import daysData from "./days.json" with { type: "json" }; --> I have commented this line because it causes error that prevents web.mjs from loading: SyntaxError: import assertions are not currently supported
import { renderCalendar } from "./render-month.mjs";
import { addNavigationButtons } from "./calendarButtons.mjs";

window.onload = function () {
    const data = new Date(); - //this line takes current date
        renderCalendar(data);
    addNavigationButtons();
}
