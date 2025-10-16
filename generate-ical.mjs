// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

import daysData from "./days.json" with { type: "json" };

//to create days.isc
import fs from 'fs';
//formatting ical
import { ICalCalendar } from 'ical-generator'; 
//task Logic for calculating dates must be shared between the web generator and the iCal generator.
import { getNthWeekday } from './getNthWeekday.mjs';

//this is from render-month.mjs
const startYear = 2020;
const endYear = 2030;
const outputFile = 'days.ics';

const monthNameToNumber = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
};

const dayNameToNumber = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6
};

const occurrenceToNumber = {
  first: 1, second: 2, third: 3, fourth: 4, fifth: 5, last: -1
};

// generate ical
function generateIcal() {
  const calendar = new ICalCalendar();

  // Loop through every year
  for (let year = startYear; year <= endYear; year++) {
    // Iterate over the imported daysData array
    daysData.forEach(event => {
      const month = monthNameToNumber[event.monthName];
      const weekday = dayNameToNumber[event.dayName];
      let n = occurrenceToNumber[event.occurence];

         // handle "last" case
      if (n === -1) {
      const fifthTry = getNthWeekday(year, month, weekday, 5);
      if (fifthTry.getMonth() + 1 === month) {
        n = 5;
      } else {
            n = 4;
        }
        }   

      const dateObj = getNthWeekday(year, month, weekday, n);

      // Create the whole-day event entry
      calendar.createEvent({
        summary: event.name,
        start: dateObj,
        allDay: true
      });
    });
  }

  // Save the calendar
fs.writeFileSync(outputFile, calendar.toString());
console.log(`Calendar created ${outputFile}`);
}

generateIcal();
