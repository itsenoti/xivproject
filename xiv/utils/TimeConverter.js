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

export function formatDate_MMM_DD_YYYY_HHMMSS(date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const month = parts.find((p) => p.type === "month").value;
  const day = parts.find((p) => p.type === "day").value;
  const year = parts.find((p) => p.type === "year").value;
  const hour = parts.find((p) => p.type === "hour").value;
  const minute = parts.find((p) => p.type === "minute").value;
  const second = parts.find((p) => p.type === "second").value;

  return `${month} ${day}, ${year} ${hour}:${minute}:${second}`;
}
