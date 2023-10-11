/**
 * @ Author: F.Villanueva
 * @ Create Time: 2023-09-18 10:32:10
 * @ Modified by: F.Villanueva
 * @ Modified time: 2023-10-08 09:40:05
 * @ Description:
 */

/** Add padding to numbers. */
export function formatTime(time) {
  // Place zero in single digits
  if (time < 10) return "0" + time;
  return time;
}
