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
