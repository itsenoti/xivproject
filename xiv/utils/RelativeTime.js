import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function GetRelativeTime(futureTime) {
  dayjs.extend(relativeTime);
  return dayjs(futureTime).fromNow(true);
}
