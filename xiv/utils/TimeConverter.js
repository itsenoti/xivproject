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
  // console.log(future > current ? `As expected` : `Oops, current is higher than target`);
  // if (future > current) {
  return future > current ? future - current : future + 2100000 - current;
}
