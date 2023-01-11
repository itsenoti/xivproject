const E_CONSTANT = 3600 / 175;
const HOUR = 3600;
const MIN = 60;

var allEorzeanWeatherList = [];

function getCurrentEorzeaTime() {
  var time = new Date();
  for (let i = 0; i < 10; i++) {
    let ticks = time.getTime() / 1000;
    let newtime = ticks * E_CONSTANT;

    let hh = Math.floor((newtime / 3600) % 24);
    let mm = Math.floor((newtime / 60) % 60);
    console.log(`et: ${hh}:${mm} - ${time}`);

    time = new Date(time.getTime() + 175000);
  }

  // return `${KEY}`;
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
