import { Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import en_text from "../../model/lang/en.json";
import ja_text from "../../model/lang/ja.json";
import Header from "../Header";
import Navigation from "../Navigation/Navigation";
import style from "./Gathering.module.css";

const LANG = "en";
var TXT = "";

if (LANG == "en") {
  TXT = en_text.en;
} else if (LANG == "ja") {
  TXT = ja_text.ja;
}

const jobsIcons = {
  SPEARFISHING: "/jobs/fsh2.png",
};

function CreateObject(
  itemName,
  job,
  location,
  coordinates,
  targetItem,
  timeStart1,
  timeStart2,
  remarks
) {
  return { itemName, job, location, coordinates, targetItem, timeStart1, timeStart2, remarks };
}

function Gathering() {
  const data = [
    CreateObject(
      `${TXT.EARTHBREAK_AETHERSAND}`,
      jobsIcons.SPEARFISHING,
      `${TXT.UPPER_LA_NOSCEA}`,
      `(X: 25, Y: 22)`,
      `${TXT.VERDIGRIS_GUPPY}`,
      `-`,
      `-`,
      `${TXT.VERDIGRIS_GUPPY} (${TXT.SMALL}, ${TXT.SPEED_AVERAGE})`
    ),
    CreateObject("Lightning Cluster", "FSH", "Upper La Noscea ()", "Verdigris Guppy", "-"),
  ];

  const card = <></>;

  return (
    <>
      <Header />
      <Navigation />
      <Container className="containerBody">
        {data.map((item) => {
          return (
            <CardContent key={item.itemName}>
              <div className={style.gatheringCardTitle}>
                <img
                  src="https://garlandtools.org/files/icons/item/21246.png"
                  className={style.titleImg}
                />
                <span>{item.itemName}</span>
              </div>
              <div className={style.gatheringCardContent}>
                <div>
                  <div className={style.gatheringCardContentHead}>{TXT.JOB}</div>
                  <div className={style.gatheringCardContentBody}>
                    <img src={item.job}></img>
                  </div>
                </div>
                <div>
                  <div className={style.gatheringCardContentHead}>{TXT.LOCATION}</div>
                  <div className={style.gatheringCardContentBody}>
                    {item.location} {item.coordinates}
                  </div>
                </div>
                <div>
                  <div className={style.gatheringCardContentHead}>{TXT.REMARKS}</div>
                  <div className={style.gatheringCardContentBody}>{item.remarks}</div>
                </div>
              </div>
            </CardContent>
          );
        })}
      </Container>
    </>
  );
}

export default Gathering;
