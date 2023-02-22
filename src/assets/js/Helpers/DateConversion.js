export default class DateConvevrsion {
  // Convert a date to its year-month-day representation
  static toYMD(date) {
    const DATE = new Date(date);

    const YEAR = DATE.getFullYear();
    const MONTH = DATE.getMonth().toString().padStart(2, '0');
    const DAY = DATE.getDate().toString().padStart(2, '0');

    return `${YEAR}-${MONTH}-${DAY}`;
  }
}
