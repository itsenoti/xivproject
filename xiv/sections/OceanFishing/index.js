const Pattern = [
  "BD",
  "TD",
  "ND",
  "RD",
  "BS",
  "TS",
  "NS",
  "RS",
  "BN",
  "TN",
  "NN",
  "RN",
  "TD",
  "ND",
  "RD",
  "BS",
  "TS",
  "NS",
  "RS",
  "BN",
  "TN",
  "NN",
  "RN",
  "BD",
  "ND",
  "RD",
  "BS",
  "TS",
  "NS",
  "RS",
  "BN",
  "TN",
  "NN",
  "RN",
  "BD",
  "TD",
  "RD",
  "BS",
  "TS",
  "NS",
  "RS",
  "BN",
  "TN",
  "NN",
  "RN",
  "BD",
  "TD",
  "ND",
  "BS",
  "TS",
  "NS",
  "RS",
  "BN",
  "TN",
  "NN",
  "RN",
  "BD",
  "TD",
  "ND",
  "RD",
  "TS",
  "NS",
  "RS",
  "BN",
  "TN",
  "NN",
  "RN",
  "BD",
  "TD",
  "ND",
  "RD",
  "BS",
  "NS",
  "RS",
  "BN",
  "TN",
  "NN",
  "RN",
  "BD",
  "TD",
  "ND",
  "RD",
  "BS",
  "TS",
  "RS",
  "BN",
  "TN",
  "NN",
  "RN",
  "BD",
  "TD",
  "ND",
  "RD",
  "BS",
  "TS",
  "NS",
  "BN",
  "TN",
  "NN",
  "RN",
  "BD",
  "TD",
  "ND",
  "RD",
  "BS",
  "TS",
  "NS",
  "RS",
  "TN",
  "NN",
  "RN",
  "BD",
  "TD",
  "ND",
  "RD",
  "BS",
  "TS",
  "NS",
  "RS",
  "BN",
  "NN",
  "RN",
  "BD",
  "TD",
  "ND",
  "RD",
  "BS",
  "TS",
  "NS",
  "RS",
  "BN",
  "TN",
  "RN",
  "BD",
  "TD",
  "ND",
  "RD",
  "BS",
  "TS",
  "NS",
  "RS",
  "BN",
  "TN",
  "NN",
];

const TWO_HOURS = 2 * 60 * 60 * 1000;
const OFFSET = 88;

const getRemainingTime = () => {
  let dateNow = new Date();
  console.log(dateNow.getHours() % 2 == 0 ? true : false);

  if (dateNow.getHours() % 2 == 1) {
    dateNow.setHours(dateNow.getHours() + 1);
    console.log(dateNow);
  }
};

let currentVoyage = new Date();
let nextVoyage = new Date();
nextVoyage.setHours(nextVoyage.getHours() + 2);

export default function OceanFishing() {
  return (
    <>
      <div className="section">Ocean Fishing</div>
      <div>{getRoute(nextVoyage)}</div>
      <div>{getRemainingTime()}</div>
      {/*  */}
      {/*  */}
    </>
  );
}

function getRoute(date) {
  // Get the number of voyages since 00:00:00 UTC, 1 January 1970
  const voyageNumber = Math.floor(date.getTime() / TWO_HOURS);

  // Get where it lies in the pattern
  const route = Pattern[(OFFSET + voyageNumber) % Pattern.length];

  const routeName = {
    B: "Bloodbrine Sea",
    T: "Rothlyt Sound",
    N: "Northern Strait of Merlthor",
    R: "Rhotano Sea",
  };

  const hourOfDay = {
    D: "Daytime",
    S: "Sunset",
    N: "Nighttime",
  };

  return `${routeName[route[0]]} (${hourOfDay[route[1]]})`;
}
