export function getNumberOfDays(time) {
  return Math.abs(Math.floor(time / (1000 * 60 * 60 * 24)));
}

export function getNumberOfHours(time) {
  return Math.abs(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
}

export function getNumberOfMinutes(time) {
  return Math.abs(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
}

export function getNumberOfSeconds(time) {
  return Math.abs(Math.floor((time % (1000 * 60)) / 1000));
}

export function getTimeDifferenceMs(future, current) {
  return future - current;
}
