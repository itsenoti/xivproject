export const ICON_WIDTH = 20;
export const ICON_HEIGHT = 20;

const XIVAPI = require("@xivapi/js");
export const xiv = new XIVAPI({
  private_key: "0e10f5e9281a440aa3ef229247707c388ceabfc282d84558945abd1d795bb3e4",
  language: "en",
  snake_case: true,
});

// Blank text (placeholder)
export const INVISIBLE_TEXT = "&#8203";

// Cell types used in Faux Hallows
export const FauxHallow_Cell = {
  REGULAR: "0",
  DISABLED: "1",
  SWORD_V_1: "A",
  SWORD_V_2: "B",
  SWORD_V_3: "C",
  SWORD_V_4: "D",
  SWORD_V_5: "E",
  SWORD_V_6: "F",
  SWORD_H_1: "G",
  SWORD_H_2: "H",
  SWORD_H_3: "I",
  SWORD_H_4: "J",
  SWORD_H_5: "K",
  SWORD_H_6: "L",
  TREAS_V_1: "M",
  TREAS_V_2: "N",
  TREAS_V_3: "O",
  TREAS_V_4: "P",
  FOX: "Q",
  RECOM_1: "R",
  RECOM_2: "S",
  RECOM_3: "T",
  RECOM_4: "U",
};

export const JOBS = {
  ALC: "ALC",
  CUL: "CUL",
};

// Icons
export const LOGGING = "/icons/Gathering/060433_hr1.png";
export const HARVESTING = "/icons/Gathering/060432_hr1.png";
export const MINING = "/icons/Gathering/060438_hr1.png";
export const QUARRYING = "/icons/Gathering/060437_hr1.png";

function Globals() {
  return <></>;
}

export default Globals;
