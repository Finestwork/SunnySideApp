export default class EventRateLimiter {
  static debounce(cb, waitingTime = 250) {
    let timeoutId = null;

    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        timeoutId = null;
        cb(...args);
      }, waitingTime);
    };
  }

  static debounceLead(cb, waitingTime = 250) {
    let timeoutId = null;

    return (...args) => {
      if (!timeoutId) cb(...args);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, waitingTime);
    };
  }

  static throttle(cb, waitingTime = 250) {
    let timeoutId = null;

    return (...args) => {
      if (!!timeoutId) return;

      timeoutId = setTimeout(() => {
        timeoutId = null;
        cb(...args);
      }, waitingTime);
    };
  }
}
