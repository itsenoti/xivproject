/**
 * @ Author: F.Villanueva
 * @ Create Time: 2023-01-18 10:27:40
 * @ Modified by: F.Villanueva
 * @ Modified time: 2024-05-18 12:46:01
 * @ Description:
 */

/**
 * @description Converts first letter of each word to capital (Ex: hello world → Hello World)
 * @param {*} txt
 * @returns string with capitalized letters of each word
 */
export function cleanString(txt) {
  let newString = txt.split(" ");
  for (let index = 0; index < newString.length; index++) {
    newString[index] = newString[index].charAt(0).toUpperCase() + newString[index].substring(1);
  }

  return newString.join(" ");
}

/**
 * @param {text} string
 * @returns string without spaces
 */
// Remove all spaces from a string
export function RemoveSpacesFromString(text) {
  return text.replace(/\s/g, "");
}
