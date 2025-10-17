import { getNthWeekday } from "./getNthWeekday.mjs";
import { activateModalPopup } from "./modalPopup.mjs";

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


export async function renderCalendar(date = new Date()) {
  container.innerText = "";
  container.setAttribute("data-renderedDate", date.toISOString()); 

  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthNames = Object.keys(monthNameToNumber);

  const eventsForThisYear = await loadEvents(year);

  const title = document.createElement("h1");
  title.textContent = `${monthNames[monthIndex]} ${year}`;
  container.appendChild(title);

  
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dayHeader = document.createElement("div");
    dayHeader.className = "day-header-row";

dayNames.forEach(name => {
  const headerCell = document.createElement("div");
  headerCell.className = "day-header";
  headerCell.textContent = name;
  dayHeader.appendChild(headerCell);
});

container.appendChild(dayHeader);


  const grid = document.createElement("div");
  grid.className = "monthDaysDiv";

  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7;
  
  const prevMonth = new Date(year, monthIndex, 0);
  const prevMonthLastDay = prevMonth.getDate();

  for (let i = 0; i < offset; i++) {
    const empty = document.createElement("div");
    empty.className = "days other-month";
    empty.textContent = prevMonthLastDay - offset + i + 1;
    grid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "day";

    const number = document.createElement("div");
    number.className = "day-number";
    number.textContent = day;
    cell.appendChild(number);

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

      await activateModalPopup(cell, eventToday.name, eventToday.descriptionURL);
    }

    grid.appendChild(cell);
  }
      const totalCells = offset + daysInMonth;
      const remaining = (7 - (totalCells % 7)) % 7;
      for (let i = 1; i <= remaining; i++) {
        const empty = document.createElement("div");
        empty.className = "day other-month";
        empty.textContent = i; 
        grid.appendChild(empty);
      }

  container.appendChild(grid);
}
