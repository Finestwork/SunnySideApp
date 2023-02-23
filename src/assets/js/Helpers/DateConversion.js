export default class DateConvevrsion {
  // Convert a date to its year-month-day representation
  static toYMD(date) {
    const DATE = new Date(date);

    const YEAR = DATE.getFullYear();
    const MONTH = DATE.getMonth() + 1; // Starts at 0
    const DAY = DATE.getDate();

    return `${YEAR}-${MONTH.toString().padStart(2, '0')}-${DAY.toString().padStart(2, '0')}`;
  }

  // Add date based on the given parameter value
  static addDate(addDate, date = new Date()) {
    const DATE = new Date(date);

    DATE.setDate(DATE.getDate() + addDate);

    return DATE;
  }

  // Shortened the time to HH:mm PM|AM
  static shortenTime(time) {
    const DATE = new Date(time);
    return DATE.toLocaleTimeString('en', { timeStyle: 'short' });
  }

  // Returns a Date object with the specified date and the current time, using the local timezone offset.
  static addTimeToCurrentDate(date){
    const DATE = new Date();
    const NOW = new Date(date);
    NOW.setHours(DATE.getHours());
    NOW.setMinutes(DATE.getMinutes());
    NOW.setSeconds(DATE.getSeconds());
    NOW.setMilliseconds(DATE.getMilliseconds());
    return DATE;
  }

  // This returns the time string based on a given timezone
  static getTimeFromTimezone(timeZone){
    const DATE = new Date();

    return DATE.toLocaleTimeString('en', {timeZone, timeStyle: 'short'});
  }
}
