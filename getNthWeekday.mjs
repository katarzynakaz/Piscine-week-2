export function getNthWeekday(year, month, weekday, n) {
  const firstDay = new Date(year, month - 1, 1); 
  const daysInMonth = new Date(year, month, 0).getDate();

  if (n > 0) {
    
    const firstWeekday = firstDay.getDay(); 
    const dayOffset = (weekday - firstWeekday + 7) % 7;
    const date = 1 + dayOffset + (n - 1) * 7;

    if (date > daysInMonth) return null; 
    return new Date(year, month - 1, date);
  } else {
  
    const lastDay = new Date(year, month, 0).getDate(); 
    const lastDateObj = new Date(year, month - 1, lastDay);
    const lastWeekday = lastDateObj.getDay();
    const offset = (lastWeekday - weekday + 7) % 7;
    const date = lastDay - offset;
    return new Date(year, month - 1, date);
  }
}
