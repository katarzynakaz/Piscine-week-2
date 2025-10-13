 export function getNthWeekday(year, month, weekday, n) {
      const firstDay = new Date(year, month - 1, 1);
      const firstDayOfWeek = firstDay.getDay();
      const offset = (weekday - firstDayOfWeek + 7) % 7;
      const date = 1 + offset + (n - 1) * 7;
      return new Date(year, month - 1, date);
    }