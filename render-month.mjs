import { getNthWeekday } from "./getNthWeekday.js";

export async function renderCalendar(year = new Date().getFullYear(), monthIndex = new Date().getMonth()) {
  const container = document.getElementById("calendarContainer");
  container.innerHTML = "";

  const commemorativeDays = await fetch("./days.json").then(res => res.json());

  const eventsForThisYear = commemorativeDays.map(event => {
    const dateObj = getNthWeekday(year, event.month, event.weekday, event.weekNumber);
    return {
      ...event,
      day: dateObj.getDate(),
      year: dateObj.getFullYear()
    };
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const title = document.createElement("h1");
  title.textContent = `${monthNames[monthIndex]} ${year}`;
  container.appendChild(title);

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDay = new Date(year, monthIndex, 1);
  const offset = (firstDay.getDay() + 6) % 7; // Monday start

  const grid = document.createElement("div");
  grid.className = "monthDaysDiv";

  for (let i = 0; i < offset; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty-day-slot";
    grid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "day";

    const number = document.createElement("div");
    number.className = "day-number";
    number.textContent = day;

    cell.appendChild(number);

    const event = eventsForThisYear.find(
      e => e.month === monthIndex + 1 && e.day === day
    );

    if (event) {
      cell.classList.add("highlight");

      const eventName = document.createElement("div");
      eventName.className = "holiday";
      eventName.textContent = event.name;

      const eventDescription = document.createElement("div");
      eventDescription.className = "description";
      eventDescription.textContent = event.description;

      cell.appendChild(eventName);
      cell.appendChild(eventDescription);
    }

    grid.appendChild(cell);
  }

  container.appendChild(grid);
}
