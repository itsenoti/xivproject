const E_CONSTANT = 3600 / 175;
const HOUR = 3600;
const MIN = 60;

var allEorzeanWeatherList = [];

function getCurrentEorzeaTime() {
  // const xiv = new XIVAPI({
  //   private_key: "0e10f5e9281a440aa3ef229247707c388ceabfc282d84558945abd1d795bb3e4",
  //   language: "en",
  //   snake_case: true,
  // });

  // console.log(xiv);
  const XIVAPI = require("@xivapi/js");

  const xiv = new XIVAPI({
    private_key: "0e10f5e9281a440aa3ef229247707c388ceabfc282d84558945abd1d795bb3e4",
    language: "ja",
    snake_case: true,
  });

  const id = xiv.search("Prismstone");
  console.log(id);
}

function convertLTtoET(time) {
  let epoch = time.getTime() / 1000;
  let newtime = epoch * E_CONSTANT;

  let hh = Math.floor((newtime / HOUR) % 24);
  let mm = Math.floor((newtime / MIN) % 60);

  return `${hh} ${mm}`;
}

function getLtEquivalentOfEt(timeMs) {
  return new Date(timeMs);
}

export function convertToLT() {
  return <span>{getCurrentEorzeaTime()}</span>;
}

/**
 *
 * @param {} Get weather for this time; +1 for next weather change
 */
function getAllEorzeaWeatherForecast() {
  let epoch = new Date().getTime() / 1000;
  let newtime = epoch * E_CONSTANT;

  let hh = Math.floor((newtime / HOUR) % 24);
  let mm = Math.floor((newtime / MIN) % 60);

  return <>{et_hour}</>;
}

export default getAllEorzeaWeatherForecast;
