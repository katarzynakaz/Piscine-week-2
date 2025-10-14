import { getNthWeekday } from "./getNthWeekday.js";

const monthNameToNumber = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
};

const dayNameToNumber = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6
};

const occurrenceToNumber = {
  first: 1, second: 2, third: 3, fourth: 4, fifth: 5
};

const container = document.getElementById("calendarContainer");

/**
 * Loads events from JSON and calculates their actual dates for a given year.
 */
async function loadEvents(year) {
  const commemorativeDays = await fetch("./days.json").then(res => res.json());

  return commemorativeDays.map(event => {
    const month = monthNameToNumber[event.monthName];
    const weekday = dayNameToNumber[event.dayName];
    const n = occurrenceToNumber[event.occurence];
    const dateObj = getNthWeekday(year, month, weekday, n);

    return {
      ...event,
      day: dateObj.getDate(),
      month,
      year
    };
  });
}

/**
 * Renders a calendar grid for the given year and month.
 */
export async function renderCalendar(date = new Date()) {
  container.innerHTML = "";

  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthNames = Object.keys(monthNameToNumber);

  // Load events for this year
  const eventsForThisYear = await loadEvents(year);

  // Add title
  const title = document.createElement("h1");
  title.textContent = `${monthNames[monthIndex]} ${year}`;
  container.appendChild(title);

  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7; // start Monday

  const grid = document.createElement("div");
  grid.className = "monthDaysDiv";

  // Empty slots before the first day
  for (let i = 0; i < offset; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty-day-slot";
    grid.appendChild(empty);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "day";

    const number = document.createElement("div");
    number.className = "day-number";
    number.textContent = day;
    cell.appendChild(number);

    // Match commemorative event
    const eventToday = eventsForThisYear.find(
      e => e.month === monthIndex + 1 && e.day === day
    );

    if (eventToday) {
      cell.classList.add("highlight");

      const eventName = document.createElement("div");
      eventName.className = "holiday";
      eventName.textContent = eventToday.name;
      cell.appendChild(eventName);

      const link = document.createElement("a");
      link.className = "description";
      link.href = eventToday.descriptionURL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "More info";
      cell.appendChild(link);
    }

    grid.appendChild(cell);
  }

  container.appendChild(grid);
}
