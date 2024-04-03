import dayjs from "dayjs";

function GetCurrentDate() {
  var date = new Date();
  return dayjs(date).format("MMM DD, YYYY");
}

export default GetCurrentDate;
