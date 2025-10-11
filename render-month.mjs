export function renderCalendar(date) {
	// when page loads, we check if calendar dom element exists
	// if not ( == null ) we create it and append it to body
	if (document.getElementById("calendar-wrap-div") == null) {
		// calendar days will be rendered inside of this element
		const calendarWrapDiv = document.createElement("div");
		calendarWrapDiv.setAttribute("id", "calendar-wrap-div");
		// after empty calendarWrapDiv created we attach it to body
		document.querySelector("body").appendChild(calendarWrapDiv);
	}
	// if calendarWrapDiv was already existing we just clear it
	const calendarWrapDiv = document.getElementById("calendar-wrap-div");
	calendarWrapDiv.innerHTML = '';

	/************************************************************** */
	// in this part we will implement calendar grid rendering itself
	// but for now placeholder will be displayed
	calendarWrapDiv.innerHTML = `This is a placeholder for calendar date: *${date}`;
	/************************************************************** */

	// here I store rendered date as parameter, 
	// we need this to move one month forward or backwards
	calendarWrapDiv.setAttribute("data-renderedDate", date);
};
