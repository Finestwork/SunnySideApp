export default class DateConvevrsion {
  // Convert a date to its year-month-day representation
  static toYMD(date) {
    const DATE = new Date(date);

    const YEAR = DATE.getFullYear();
    const MONTH = DATE.getMonth().toString().padStart(2, '0');
    const DAY = DATE.getDate().toString().padStart(2, '0');

    return `${YEAR}-${MONTH}-${DAY}`;
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
}
