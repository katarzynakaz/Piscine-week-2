//grab container the calendar will be appended to
const calendarContainer = document.getElementById("calendarContainer");
calendarContainer.className = "calendarContainer";

//how many days in the month
const checkHowManyDaysInCurrentMonth = () => {
	// no leap calc for now
	return monthDetails[6].days; // June for now hardcoded
};

//array with month names to display on top of the calendar and days for day slots, also added index in case it's needed for buttons to change months
const monthDetails = [
	{ monthIndex: 0, name: "January", days: 31 },
	{ monthIndex: 1, name: "February", days: 28 }, // for now all have 28 days
	{ monthIndex: 2, name: "March", days: 31 },
	{ monthIndex: 3, name: "April", days: 30 },
	{ monthIndex: 4, name: "May", days: 31 },
	{ monthIndex: 5, name: "June", days: 30 },
	{ monthIndex: 6, name: "July", days: 31 },
	{ monthIndex: 7, name: "August", days: 31 },
	{ monthIndex: 8, name: "September", days: 30 },
	{ monthIndex: 9, name: "October", days: 31 },
	{ monthIndex: 10, name: "November", days: 30 },
	{ monthIndex: 11, name: "December", days: 31 },
];

// helper for month name and day slots divs
const showCalendar = (monthIndex, fullCurrentMonthContainer) => {
	// get and show month name
	const monthNameDisplay = document.createElement("h1");
	monthNameDisplay.id = "month-name";
	monthNameDisplay.textContent = monthDetails[monthIndex].name;
	//apend title to calendar box
	fullCurrentMonthContainer.appendChild(monthNameDisplay);

	// how many days in the month
	const daySlots = monthDetails[monthIndex].days;
	// when not hardcoded checkHowManyDaysInCurrentMonth()

	// create div for all days that keeps all day boxes
	const allDaysDiv = document.createElement("div");
	allDaysDiv.className = "monthDaysDiv";

	//assuming hardcoded date is 1/7/2025, Sunday
	const emptyDaySlotNumber = 6;
	//create empty divs for the calendar to be correctly placed
	const emptyDaySlotIfMonthsDoesNotStartOnMonday = "empty-day-slot";

	// loop to add required emptry slots
	for (let j = 0; j < emptyDaySlotNumber; j++) {
		const emptyDayDiv = document.createElement("div");
		// // add day class to empty slots to align with the rest and other class
		emptyDayDiv.className = `day ${emptyDaySlotIfMonthsDoesNotStartOnMonday}`;
		allDaysDiv.appendChild(emptyDayDiv);
	}

	// create day slots so allDaysDiv has all day boxes for the month
	for (let i = 1; i <= daySlots; i++) {
		const singleDayDiv = document.createElement("div");
		singleDayDiv.className = "day";

		singleDayDiv.innerHTML = `
    <div class="day-number">${i}</div>  `;
		// this is to apply styling to the day of the week and description
		// <span class="day-of-week">Day</span>
		//<p class="description">Description</p>

		allDaysDiv.appendChild(singleDayDiv);
	}

	// append all day divs to full month wrapper
	fullCurrentMonthContainer.appendChild(allDaysDiv);
};

//show calendar
export const renderCalendar = () => {
	// call helper to show month and day slots directly into existing container
	showCalendar(6, calendarContainer); // June
};
